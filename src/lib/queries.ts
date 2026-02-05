"use server";

import { db } from "./db";
import { v4 } from 'uuid'
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Agency, Plan, SubAccount, User } from "../../generated/prisma/client";


export const getAuthUserDetails = async () => {
  const user = await currentUser();
  if (!user) {
    return;
  }

  const userData = await db.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
    include: {
      Agency: {
        include: {
          SidebarOption: true,
          SubAccount: {
            include: {
              SidebarOption: true,
            },
          },
        },
      },
      Permissions: true,
    },
  });
  return userData;
};

export const saveActivityLogsNotification = async ({
  agencyId,
  description,
  subAccountId,
}: {
  agencyId?: string;
  description: string;
  subAccountId?: string;
}) => {
  const authUser = await currentUser();
  let userData;
  if (!authUser) {
    const response = await db.user.findFirst({
      where: {
        Agency: {
          SubAccount: {
            some: { id: subAccountId },
          },
        },
      },
    });
    if (response) userData = response;
  } else {
    userData = await db.user.findUnique({
      where: {
        email: authUser.emailAddresses.at(0)?.emailAddress,
      },
    });
  }

  if (!userData) {
    console.log("Could not find a user");
    return;
  }

  let foundAgencyId = agencyId;
  if (!foundAgencyId) {
    if (!subAccountId) {
      throw new Error(
        "You need to provide atleast an agency Id or subAccount Id",
      );
    }
    const response = await db.subAccount.findUnique({
      where: {
        id: subAccountId,
      },
    });
    if (response) foundAgencyId = response.agencyId;
  }

  if (subAccountId) {
    await db.notification.create({
      data: {
        notification: `${userData.name} | ${description}`,
        User: {
          connect: {
            id: userData.id,
          },
        },
        Agency: {
          connect: {
            id: foundAgencyId,
          },
        },
        SubAccount: {
          connect: {
            id: subAccountId,
          },
        },
      },
    });
  } else {
    await db.notification.create({
      data: {
        notification: `${userData.name} | ${description}`,
        User: {
          connect: {
            id: userData.id,
          },
        },
        Agency: {
          connect: {
            id: foundAgencyId,
          },
        },
      },
    });
  }
};

export const createTeamUser = async (agencyId: String, user: User) => {
  if (user.role == "AGENCY_OWNER") return null;
  const response = await db.user.create({ data: { ...user } });
  return response;
};

export const verifyAndAcceptInvitation = async () => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const invitationExists = await db.invitation.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
      status: "PENDING",
    },
  });
  if (invitationExists) {
    const userDetails = await createTeamUser(invitationExists.agencyId, {
      email: invitationExists.email,
      agencyId: invitationExists.agencyId,
      avatarUrl: user.imageUrl,
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      role: invitationExists.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await saveActivityLogsNotification({
      agencyId: invitationExists?.agencyId,
      description: `Joined`,
      subAccountId: undefined,
    });

    if (userDetails) {
      const client = await clerkClient();
      await client.users.updateUserMetadata(user.id, {
        privateMetadata: {
          role: userDetails.role || "SUBACCOUNT_USER",
        },
      });

      await db.invitation.delete({
        where: { email: userDetails.email },
      });

      return userDetails.agencyId;
    } else return null;
  } else {
    const agency = await db.user.findUnique({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
    });
    return agency ? agency.agencyId : null;
  }
};

export const updateAgencyDetails = async (
  agencyId: string,
  agencyDetails: Partial<Agency>,
) => {
  const response = await db.agency.update({
    where: { id: agencyId },
    data: { ...agencyDetails },
  });
  return response;
};

export const deleteAgency = async (agencyId: string) => {
  const response = await db.agency.delete({
    where: { id: agencyId },
  });
  return response;
};

export const initUser = async (newUser: Partial<User>) => {
  const user = await currentUser();
  if (!user) return;

  const userData = await db.user.upsert({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
    update: newUser,
    create: {
      id: user.id,
      avatarUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName} ${user.lastName}`,
      role: newUser.role || "SUBACCOUNT_USER",
    },
  });

  const client = await clerkClient();
  await client.users.updateUserMetadata(user.id, {
    privateMetadata: {
      role: newUser.role || "SUBACCOUNT_USER",
    },
  });

  return userData;
};

type AgencyInput = {
  id: string;
  name?: string;
  customerId?: string;
  connectAccountId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  companyEmail: string;
  agencyLogo?: string;
  companyPhone?: string;
  whiteLabel?: boolean;
  address?: string;
  city?: string;
  zipCode?: string;
  state?: string;
  country?: string;
  goal?: number;
};

export const upsertAgency = async (agency: AgencyInput, price?: Plan) => {
  if (!agency.companyEmail) return null;

  // Debug: Log what we're receiving
  console.log("upsertAgency - received agency:", {
    id: agency.id,
    name: agency.name,
    companyEmail: agency.companyEmail,
    hasName: "name" in agency,
    nameType: typeof agency.name,
    allKeys: Object.keys(agency),
  });

  // Extract all required scalar fields explicitly to ensure they're available
  const {
    id,
    name,
    customerId,
    connectAccountId,
    createdAt,
    updatedAt,
    companyEmail,
    agencyLogo,
    companyPhone,
    whiteLabel,
    address,
    city,
    zipCode,
    state,
    country,
    goal,
  } = agency;

  // Validate required fields and provide defaults
  const validatedName = name?.trim() || "";
  const validatedAgencyLogo = agencyLogo?.trim() || "";
  const validatedCompanyPhone = companyPhone?.trim() || "";
  const validatedAddress = address?.trim() || "";
  const validatedCity = city?.trim() || "";
  const validatedZipCode = zipCode?.trim() || "";
  const validatedState = state?.trim() || "";
  const validatedCountry = country?.trim() || "";

  if (!validatedName) {
    throw new Error("Agency name is required");
  }
  if (!validatedAgencyLogo) {
    throw new Error("Agency logo is required");
  }
  if (!validatedCompanyPhone) {
    throw new Error("Company phone is required");
  }
  if (!validatedAddress) {
    throw new Error("Address is required");
  }
  if (!validatedCity) {
    throw new Error("City is required");
  }
  if (!validatedZipCode) {
    throw new Error("Zip code is required");
  }
  if (!validatedState) {
    throw new Error("State is required");
  }
  if (!validatedCountry) {
    throw new Error("Country is required");
  }

  try {
    const agencyDetails = await db.agency.upsert({
      where: {
        id: id,
      },
      update: {
        name: validatedName,
        customerId: customerId || "",
        connectAccountId: connectAccountId || "",
        companyEmail,
        agencyLogo: validatedAgencyLogo,
        companyPhone: validatedCompanyPhone,
        whiteLabel: whiteLabel ?? true,
        address: validatedAddress,
        city: validatedCity,
        zipCode: validatedZipCode,
        state: validatedState,
        country: validatedCountry,
        goal: goal ?? 5,
      },
      create: {
        id,
        name: validatedName,
        customerId: customerId || "",
        connectAccountId: connectAccountId || "",
        createdAt: createdAt || new Date(),
        updatedAt: updatedAt || new Date(),
        companyEmail,
        agencyLogo: validatedAgencyLogo,
        companyPhone: validatedCompanyPhone,
        whiteLabel: whiteLabel ?? true,
        address: validatedAddress,
        city: validatedCity,
        zipCode: validatedZipCode,
        state: validatedState,
        country: validatedCountry,
        goal: goal ?? 5,
        users: {
          connect: { email: agency.companyEmail },
        },
        SidebarOption: {
          create: [
            {
              name: "Dashboard",
              icon: "category",
              link: `/agency/${agency.id}`,
            },
            {
              name: "Launchpad",
              icon: "clipboardIcon",
              link: `/agency/${agency.id}/launchpad`,
            },
            {
              name: "Billing",
              icon: "payment",
              link: `/agency/${agency.id}/billing`,
            },
            {
              name: "Settings",
              icon: "settings",
              link: `/agency/${agency.id}/settings`,
            },
            {
              name: "Sub Accounts",
              icon: "person",
              link: `/agency/${agency.id}/all-subaccounts`,
            },
            {
              name: "Team",
              icon: "shield",
              link: `/agency/${agency.id}/team`,
            },
          ],
        },
      },
    });
    return agencyDetails;
  } catch (e) {
    console.error("upsertAgency error:", e);
    // Re-throw the error so it can be caught by the form
    throw e;
  }
};

export const getNotificationAndUser = async (agencyId: string) => {
  try {
    const response = await db.notification.findMany({
      where: {
        agencyId: agencyId,
      },
      include: {
        User: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const upsertSubAccount = async (subAccount: SubAccount) => {
  if (!subAccount.companyEmail) return null

  // 1. Find the Agency Owner to assign permissions
  const agencyOwner = await db.user.findFirst({
    where: {
      Agency: {
        id: subAccount.agencyId,
      },
      role: 'AGENCY_OWNER',
    },
  })

  if (!agencyOwner) {
    console.log('ERROR: Could not find an Agency Owner for this ID')
    return null
  }

  const permissionId = v4()

  try {
    const response = await db.subAccount.upsert({
      where: { id: subAccount.id },
      update: subAccount,
      create: {
        ...subAccount,
        Permissions: {
          create: {
            access: true,
            email: agencyOwner.email,
            id: permissionId,
          },
          // Note: The 'connect' block was removed. 
          // Prisma handles the relationship automatically when using 'create' inside 'upsert'.
        },
        Pipeline: {
          create: { name: 'Lead Cycle' },
        },
        SidebarOption: {
          create: [
            {
              name: 'Launchpad',
              icon: 'clipboardIcon',
              link: `/subaccount/${subAccount.id}/launchpad`,
            },
            {
              name: 'Settings',
              icon: 'settings',
              link: `/subaccount/${subAccount.id}/settings`,
            },
            {
              name: 'Funnels',
              icon: 'pipelines',
              link: `/subaccount/${subAccount.id}/funnels`,
            },
            {
              name: 'Media',
              icon: 'database',
              link: `/subaccount/${subAccount.id}/media`,
            },
            {
              name: 'Automations',
              icon: 'chip',
              link: `/subaccount/${subAccount.id}/automations`,
            },
            {
              name: 'Pipelines',
              icon: 'flag',
              link: `/subaccount/${subAccount.id}/pipelines`,
            },
            {
              name: 'Contacts',
              icon: 'person',
              link: `/subaccount/${subAccount.id}/contacts`,
            },
            {
              name: 'Dashboard',
              icon: 'category',
              link: `/subaccount/${subAccount.id}`,
            },
          ],
        },
      },
    })
    return response
  } catch (error) {
    console.error('ERROR UPSERTING SUBACCOUNT:', error)
    return null
  }
}