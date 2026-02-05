'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { v4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

import { saveActivityLogsNotification, upsertSubAccount } from '@/lib/queries'
import { useModal } from '@/providers/ModalProvider'
import { Agency, SubAccount } from '../../../generated/prisma'
import FileUpload from '../global/file-upload'
import Loading from '../global/loading'

const formSchema = z.object({
  name: z.string().min(1),
  companyEmail: z.string().email(),
  companyPhone: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  subAccountLogo: z.string().min(1),
  zipCode: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
})

interface SubAccountDetailsProps {
  agencyDetails: Agency
  details?: Partial<SubAccount>
  userId: string
  userName: string
}

const SubAccountDetails: React.FC<SubAccountDetailsProps> = ({
  details,
  agencyDetails,
  userId,
  userName,
}) => {
  const { setClose } = useModal()
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: details?.name || "",
      companyEmail: details?.companyEmail || "",
      companyPhone: details?.companyPhone || "",
      address: details?.address || "",
      city: details?.city || "",
      zipCode: details?.zipCode || "",
      state: details?.state || "",
      country: details?.country || "",
      subAccountLogo: details?.subAccountLogo || "",
    },
  })

  // Watch logo for FileUpload component
  const subAccountLogo = watch('subAccountLogo')

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      const response = await upsertSubAccount({
        id: details?.id ? details.id : v4(),
        address: values.address,
        subAccountLogo: values.subAccountLogo,
        city: values.city,
        companyPhone: values.companyPhone,
        country: values.country,
        name: values.name,
        state: values.state,
        zipCode: values.zipCode,
        createdAt: new Date(),
        updatedAt: new Date(),
        companyEmail: values.companyEmail,
        agencyId: agencyDetails.id,
        connectAccountId: '',
        goal: 5000,
      })

      if (!response) throw new Error('No response from server')

      await saveActivityLogsNotification({
        agencyId: response.agencyId,
        description: `${userName} | updated sub account | ${response.name}`,
        subAccountId: response.id,
      })

      toast.success('Subaccount details saved')
      setClose()
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Oppse!', {
        description: 'Could not save sub account details.',
      })
    }
  }

  useEffect(() => {
    if (details) reset(details)
  }, [details, reset])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sub Account Information</CardTitle>
        <CardDescription>Please enter business details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Custom File Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Account Logo</label>
            <FileUpload
              apiEndpoint="subaccountLogo"
              value={subAccountLogo}
              onChange={(url) => setValue('subAccountLogo', url || "")}
            />
            {errors.subAccountLogo && <p className="text-red-500 text-xs">{errors.subAccountLogo.message}</p>}
          </div>

          <div className="flex md:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">Account Name</label>
              <Input placeholder="Your agency name" {...register('name')} />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">Account Email</label>
              <Input placeholder="Email" {...register('companyEmail')} />
              {errors.companyEmail && <p className="text-red-500 text-xs">{errors.companyEmail.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Account Phone Number</label>
            <Input placeholder="Phone" {...register('companyPhone')} />
            {errors.companyPhone && <p className="text-red-500 text-xs">{errors.companyPhone.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Address</label>
            <Input placeholder="123 st..." {...register('address')} />
            {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
          </div>

          <div className="flex md:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">City</label>
              <Input placeholder="City" {...register('city')} />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">State</label>
              <Input placeholder="State" {...register('state')} />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">Zipcode</label>
              <Input placeholder="Zipcode" {...register('zipCode')} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Country</label>
            <Input placeholder="Country" {...register('country')} />
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-4">
            {isSubmitting ? <Loading /> : 'Save Account Information'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default SubAccountDetails