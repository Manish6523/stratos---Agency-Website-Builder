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
  name: z.string().min(1, 'Name is required'),
  companyEmail: z.string().email('Invalid email address'),
  companyPhone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  subAccountLogo: z.string().min(1, 'Logo is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
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
    <Card className="w-full border-none shadow-none md:border-solid md:shadow-sm px-0 md:px-6">
      <CardHeader>
        <CardTitle>Sub Account Information</CardTitle>
        <CardDescription>Please enter business details</CardDescription>
      </CardHeader>
      <CardContent className='px-0 md:px-6'>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Logo Section - Full Width */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Account Logo</label>
            <FileUpload
              apiEndpoint="subaccountLogo"
              value={subAccountLogo}
              onChange={(url) => setValue('subAccountLogo', url || "")}
            />
            {errors.subAccountLogo && (
              <p className="text-destructive text-xs">{errors.subAccountLogo.message}</p>
            )}
          </div>

          {/* Responsive Rows: Stack on mobile, side-by-side on md+ */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">Account Name</label>
              <Input 
                className="border border-secondary" 
                placeholder="Your subaccount name" 
                {...register('name')} 
              />
              {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-medium">Account Email</label>
              <Input 
                className="border border-secondary" 
                placeholder="Email" 
                {...register('companyEmail')} 
              />
              {errors.companyEmail && <p className="text-destructive text-xs">{errors.companyEmail.message}</p>}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
             <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm font-medium">Account Phone Number</label>
                <Input 
                  className="border border-secondary" 
                  placeholder="Phone" 
                  {...register('companyPhone')} 
                />
                {errors.companyPhone && <p className="text-destructive text-xs">{errors.companyPhone.message}</p>}
             </div>
             <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm font-medium">Address</label>
                <Input 
                  className="border border-secondary" 
                  placeholder="123 st..." 
                  {...register('address')} 
                />
                {errors.address && <p className="text-destructive text-xs">{errors.address.message}</p>}
             </div>
          </div>

          {/* Three column row for City, State, Zip on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">City</label>
              <Input className="border border-secondary" placeholder="City" {...register('city')} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">State</label>
              <Input className="border border-secondary" placeholder="State" {...register('state')} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Zipcode</label>
              <Input className="border border-secondary" placeholder="Zipcode" {...register('zipCode')} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Country</label>
            <Input className="border border-secondary" placeholder="Country" {...register('country')} />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full md:w-max px-8 mt-2"
          >
            {isSubmitting ? <Loading /> : 'Save Account Information'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default SubAccountDetails