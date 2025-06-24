'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { useRouter } from 'next/navigation'
import Password from '@/components/password'
import { Button } from './Button'
import logo from '@/images/logo.png'
import logoicon from '@/images/icon.png'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/features/auth/authSlice'
import storageService from '@/services/storage-service'
import { setToken, setUserData } from '@/features/general/generalSlice'
import { AppDispatch } from '@/features/Store'
import { DecodedData, UserData } from '@/services/types/type'
import { jwtDecode } from 'jwt-decode'
import { PulseLoader } from 'react-spinners'
import Image from "next/image";

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter email',
    })
    .email('Please enter valid email')
    .min(1, 'Please enter email'),
  password: z
    .string({
      required_error: 'Please enter password',
    })
    .min(1, 'Please enter password'),
})

export type LoginUser = z.infer<typeof formSchema>

export function LoginForm() {
  const form = useForm<LoginUser>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const login = async (inputs: LoginUser) => {
    setIsLoading(true)
    try {
      const response = await dispatch(loginUser(inputs)).unwrap()
      const { Token } = response.data

      const decodedData: DecodedData = jwtDecode(Token) as DecodedData

      dispatch(setToken(Token))
      dispatch(setUserData(decodedData))

      storageService.setToken(Token)
      const user: UserData = {
        Id: decodedData.Id,
        FirstName: decodedData.FirstName,
        LastName: decodedData.LastName,
        EmailAddress: decodedData.EmailAddress,
        Role: decodedData.Role,
        exp: decodedData.exp,
      }
      storageService.setUserData(user)

      router.push('/')
      setIsLoading(false)
    } catch (error) {
      console.error('Login Error:', error)
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <div className="flex w-full items-center justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div>
            <div className="flex">
              <Image
                  className="sm:hidden"
                  src={logoicon}
                  alt={'logo icon'}
                  width={40}
                  height={40}
              />
              <Image
                  className="hidden sm:block"
                  src={logo}
                  alt={'logo'}
                  priority={true}
                  width={150}
                  height={50}
              />
            </div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-black dark:text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10">
            <div>
              <form onSubmit={form.handleSubmit(login)} className="space-y-6">
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <label
                          htmlFor="email"
                          className="dark:text-muted-dark block text-sm font-medium leading-6 text-neutral-700"
                        >
                          Email address
                        </label>
                        <FormControl>
                          <div className="mt-2">
                            <input
                              id="email"
                              type="email"
                              placeholder="hello@johndoe.com"
                              className="shadow-aceternity block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:bg-neutral-900 dark:text-white sm:text-sm sm:leading-6"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <label
                          htmlFor="password"
                          className="dark:text-muted-dark block text-sm font-medium leading-6 text-neutral-700"
                        >
                          Password
                        </label>
                        <FormControl>
                          <div className="mt-2">
                            <Password
                              id="password"
                              type="password"
                              placeholder="••••••••"
                              className="shadow-aceternity block w-full rounded-md border-0 bg-white px-4 py-1.5 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:bg-neutral-900 dark:text-white sm:text-sm sm:leading-6"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <Button className="w-full flex items-center justify-center">
                    {isLoading && <PulseLoader size={8} color={'#ffffff'} />}
                    {isLoading === false && 'Sign in'}</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}
