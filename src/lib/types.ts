import { z } from "zod";
import type { Contact, Lane, Notification, Prisma, Role, Tag, Ticket, User } from "../../generated/prisma/client"
import type { _getTicketsWithAllRelations, getAuthUserDetails, getFunnels, getMedia, getPipelineDetails, getTicketsWithTags, getUserPermissions } from "./queries"

export type PromiseReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : T extends (...args: any) => infer R
  ? R
  : never

export type NotificationWithUser =
  | ({
    User: {
      id: string
      name: string
      avatarUrl: string
      email: string
      createdAt: Date
      updatedAt: Date
      role: Role
      agencyId: string | null
    }
  } & Notification)[]
  | undefined

export type UserWithPermissionsAndSubAccounts = PromiseReturnType<
  typeof getUserPermissions
>


export type AuthUserWithAgencySidebarOptionsSubAccounts =
  PromiseReturnType<typeof getAuthUserDetails>

export type UsersWithAgencySubAccountPermissionsSidebarOptions =
  PromiseReturnType<typeof getUserPermissions>


export type GetMediaFiles = PromiseReturnType<typeof getMedia>

export type CreateMediaType = Prisma.MediaCreateWithoutSubaccountInput

export type TicketAndTags = Ticket & {
  Tags: Tag[];
  Assigned: User | null;
  Customer: Contact | null;
}

export type LaneDetail = Lane & {
  Tickets: TicketAndTags[]
}

export type PipelineDetailsWithLanesCardsTagsTickets = PromiseReturnType<
  typeof getPipelineDetails
>

export type TicketWithTags = PromiseReturnType<typeof getTicketsWithTags>

export type TicketDetails = PromiseReturnType<
  typeof _getTicketsWithAllRelations
>

export const currencyNumberRegex = /^\d+(\.\d{1,2})?$/


export type FunnelsForSubAccount = PromiseReturnType<
  typeof getFunnels
>[0]

export type UpsertFunnelPage = Prisma.FunnelPageCreateWithoutFunnelInput

export type ShippingAddress = {
  city: string;
  country: string;
  line1: string;
  postal_code: string;
  state: string;
};

export type ShippingInfo = {
  address: ShippingAddress;
  name: string;
  phone: string;
};

export type RazorpayCustomer = {
  email: string;
  name: string;
  contact: string; // Required for Razorpay
  shipping?: ShippingInfo;
  address?: ShippingAddress;
};

export type StripeCustomer = RazorpayCustomer; 

export type RazorpayPlanList = {
  entity: string;
  count: number;
  items: any[]; // You can define a more specific 'Plan' type here
};

export type PriceList = RazorpayPlanList;

// 3. PAYMENT METADATA
// Useful for your Webhook and upsertSubscription action
export type RazorpayPaymentMetadata = {
  orderId: string;
  paymentId: string;
  signature: string;
  agencyId: string;
  planId: string;
};


export const FunnelDetailsValidator = z.object({
  name: z.string().min(1),
  description: z.string(),
  subDomainName: z.string().optional(),
  favicon: z.string().optional(),
});

export type FunnelDetailsSchema = z.infer<typeof FunnelDetailsValidator>;
