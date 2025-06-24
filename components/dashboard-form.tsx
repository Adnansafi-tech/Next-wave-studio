'use client'

import { fetchCategoriesData } from '@/features/category/categorySlice'
import { AppDispatch } from '@/features/Store'
import { CategoriesDto, CreateBlogDto } from '@/services/types/type'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Balancer from 'react-wrap-balancer'
import BlogEditor from './blog-editor'
import {
  AuthorInitialState,
  fetchAuthorData,
} from '@/features/author/authorSlice'
import { calculateReadingTime } from '@/lib/readingTime'
import { blogLinkGenerator } from '@/lib/blogLinkGenerator'
import { setFlashMessage } from '@/features/flashMessages/flashMessageSlice'
import { StylesConfig, GroupBase } from 'react-select'
import { GeneralInitialState } from '@/features/general/generalSlice'
import blogService from '@/services/blog-service'
import { PulseLoader } from 'react-spinners'

export interface SelectOption {
  readonly value: string
  readonly label: string
}

interface OptionType {
  label: string
  value: string
}

function CustomStyling() {
  const customStyles: StylesConfig<OptionType, true, GroupBase<OptionType>> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'var(--neutral-100)',
      border: 'none',
      boxShadow: '0 0 0 1px var(--neutral-900)',
      '&:hover': {
        boxShadow: '0 0 0 1px var(--neutral-200)',
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'var(--neutral-200)',
      color: 'var(--neutral-800)',
    }),
    input: (provided) => ({
      ...provided,
      color: 'var(--neutral-800)',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'var(--neutral-900)',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--neutral-100)',
      color: 'var(--neutral-800)',
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: 'var(--neutral-100)',
      color: 'var(--neutral-800)',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? 'var(--neutral-50)'
        : state.isFocused
          ? 'var(--neutral-200)'
          : 'var(--neutral-100)',
      color: 'var(--neutral-800)',
      '&:active': {
        backgroundColor: state.isSelected
          ? 'var(--neutral-100)'
          : 'var(--neutral-200)',
      },
    }),
  }

  return customStyles
}

export const selectOption: readonly SelectOption[] = [
  { value: 'investment-placement', label: 'Investment Placement' },
  { value: 'investor-relations', label: 'Investor Relations' },
  { value: 'interactive-pitch-decks', label: 'Interactive Pitch Decks' },
  { value: 'secure-presentations', label: 'Secure Presentations' },
  { value: 'investment-strategies', label: 'Investment Strategies' },
  { value: 'investor-engagement', label: 'Investor Engagement' },
  { value: 'fundraising', label: 'Fundraising' },
  { value: 'financial-technology', label: 'Financial Technology' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'investment-management', label: 'Investment Management' },
  { value: 'real-time-analytics', label: 'Real-time Analytics' },
  { value: 'data-driven-insights', label: 'Data-driven Insights' },
  { value: 'ai-in-fundraising', label: 'AI in Fundraising' },
  {
    value: 'modern-fundraising-techniques',
    label: 'Modern Fundraising Techniques',
  },
  { value: 'vc', label: 'VC' },
  { value: 'pe-firms', label: 'PE Firms' },
  {
    value: 'investor-queries-ai-automation',
    label: 'Investor Queries AI Automation',
  },
  { value: 'funds-placement-technology', label: 'Funds Placement Technology' },
  { value: 'ai-driven-insights', label: 'AI-driven Insights' },
  { value: 'fundraising-efficiency', label: 'Fundraising Efficiency' },
  { value: 'strategic-fundraising', label: 'Strategic Fundraising' },
  { value: 'ai-in-investor-engagement', label: 'AI in Investor Engagement' },
  { value: 'investor-relations', label: 'Investor Relations' },
  { value: 'ai-automation', label: 'AI Automation' },
  { value: 'personalized-interactions', label: 'Personalized Interactions' },
  { value: 'data-analysis', label: 'Data Analysis' },
  { value: 'investment-professionals', label: 'Investment Professionals' },
  { value: 'best-practices', label: 'Best Practices' },
  { value: 'real-world-examples', label: 'Real-World Examples' },
  { value: 'investor-communication', label: 'Investor Communication' },
  {
    value: 'enhancing-investor-relations',
    label: 'Enhancing Investor Relations',
  },
  { value: 'venture-capital', label: 'Venture Capital' },
  { value: 'private-equity', label: 'Private Equity' },
  { value: 'investment-strategies', label: 'Investment Strategies' },
  { value: 'automated-investor-qa', label: 'Automated Investor Q&A' },
  { value: 'data-security', label: 'Data Security' },
  { value: 'fundraising', label: 'Fundraising' },
  { value: 'rainmakerz', label: 'RainMakerz' },
  { value: 'encryption', label: 'Encryption' },
  {
    value: 'multi-factor-authentication',
    label: 'Multi-Factor Authentication',
  },
  { value: 'security-audits', label: 'Security Audits' },
  { value: 'investor-trust', label: 'Investor Trust' },
  { value: 'financial-technology', label: 'Financial Technology' },
  { value: 'investment-security', label: 'Investment Security' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'secure-fundraising', label: 'Secure Fundraising' },
]

export default function DashboardForm() {
  const dispatch = useDispatch<AppDispatch>()

  const { Categories } = useSelector<
    { categories: CategoriesDto },
    CategoriesDto
  >((state) => state.categories)

  const { userData } = useSelector<
    { general: GeneralInitialState },
    GeneralInitialState
  >((state) => state.general)

  const { Author } = useSelector<
    { author: AuthorInitialState },
    AuthorInitialState
  >((state) => state.author)

  const status = [
    {
      Name: 'Draft',
      Value: 1,
    },
    {
      Name: 'Published',
      Value: 2,
    },
    {
      Name: 'Archived',
      Value: 3,
    },
  ]

  useEffect(() => {
    dispatch(fetchAuthorData(userData?.Id ? userData?.Id : ''))
  }, [userData, dispatch])

  const [categories, setCategories] = useState<CategoriesDto['Categories']>()

  const [localLoading, setLocalLoading] = useState<boolean>(false)

  useEffect(() => {
    setCategories(Categories)
  }, [Categories])

  const [formData, setFormData] = useState({
    url: '',
    username: '',
    body: '',
    coverPhoto: null as File | null,
    title: '',
    description: '',
    blogAuthors: [
      {
        AuthorName: Author ? `${Author.FirstName} ${Author.LastName}` : '',
        AuthorPhoto: Author ? Author.ProfilePicture : '',
        AuthorMail: Author ? Author.EmailAddress : '',
        AuthorLinkedIn: Author ? Author.LinkedIn : '',
      },
    ],
    category: '',
    language: 'English',
    status: '',
    descriptionTag: '',
    keywords: '',
    readingTime: '',
  })

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      blogAuthors: [
        {
          AuthorName: Author ? `${Author.FirstName} ${Author.LastName}` : '',
          AuthorPhoto: Author ? Author.ProfilePicture : '',
          AuthorMail: Author ? Author.EmailAddress : '',
          AuthorLinkedIn: Author ? Author.LinkedIn : '',
        },
      ],
    }))
  }, [Author])

  useEffect(() => {
    dispatch(fetchCategoriesData())
  }, [dispatch])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    if (name === 'title') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        ...(name === 'title' && { url: blogLinkGenerator({ title: value }) }),
      }))
      console.log(formData.url, formData.title)
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }))
    }
  }

  const handleEditorChange = (value: string) => {
    const readingTime = calculateReadingTime(value)
    setFormData((prevState) => ({
      ...prevState,
      body: value,
      readingTime: `${readingTime} minutes`,
    }))
  }

  const requiredFields = [
    'title',
    'description',
    'body',
    'coverPhoto',
    'descriptionTag',
    'keywords',
  ]

  const validateForm = () => {
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLocalLoading(true)

    if (!validateForm()) {
      dispatch(
        setFlashMessage({
          message: 'Kindly fill all the required fields.',
          type: 'error',
        }),
      )
      setLocalLoading(false)
      return
    }

    const blogDto: CreateBlogDto = {
      Slug: formData.url,
      Thumbnail: {
        Path: '',
        Name: '',
        ContainerName: '',
        FolderName: '',
      },
      MainPicture: {
        Path: formData.coverPhoto?.name || '',
        Name: formData.coverPhoto?.name || '',
        ContainerName: 'nextwave',
        FolderName: 'blogs',
      },
      Body: formData.body,
      FootNotes: [],
      BlogMetadata: {
        Title: formData.title,
        Description: formData.description,
        BlogAuthors: formData.blogAuthors,
        Category: { Name: formData.category, Description: '' },
        Language: formData.language,
        DescriptionTag: formData.descriptionTag,
        Keywords: formData.keywords,
        ReadingTime: formData.readingTime,
        Version: '1.0',
        Status: formData.status,
      },
    }

    const formDataToSend = new FormData()
    if (formData.coverPhoto) {
      formDataToSend.append('file', formData.coverPhoto)
    }
    formDataToSend.append('metadata', JSON.stringify(blogDto))

    try {
      const response = await blogService.createBlog(
        blogDto,
        formData.coverPhoto!,
      )
      setLocalLoading(true)
      if (response.status) {
        dispatch(
          setFlashMessage({
            message: 'Created blog successfully',
            type: 'success',
          }),
        )
        setLocalLoading(false)
      } else {
        dispatch(
          setFlashMessage({
            message: 'Something went wrong. Contact Admin',
            type: 'error',
          }),
        )
        setLocalLoading(false)
      }

      setFormData({
        url: '',
        username: '',
        body: '',
        coverPhoto: null as File | null,
        title: '',
        description: '',
        blogAuthors: [
          {
            AuthorName: '',
            AuthorPhoto: '',
            AuthorMail: '',
            AuthorLinkedIn: '',
          },
        ],
        category: '',
        status: '',
        language: 'English',
        descriptionTag: '',
        keywords: '',
        readingTime: '',
      })
    } catch (error) {
      setLocalLoading(true)
      setFormData({
        url: '',
        username: '',
        body: '',
        coverPhoto: null as File | null,
        title: '',
        description: '',
        blogAuthors: [
          {
            AuthorName: '',
            AuthorPhoto: '',
            AuthorMail: '',
            AuthorLinkedIn: '',
          },
        ],
        category: '',
        status: '',
        language: 'English',
        descriptionTag: '',
        keywords: '',
        readingTime: '',
      })
      console.error('Error creating blog:', error)
    }
  }

  return (
    <div className="z-50 space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
      <form onSubmit={handleSubmit}>
        <div className="sm:overflow-hidden sm:rounded-md">
          <div className="item-center flex h-[5rem] w-full flex-col justify-center">
            <h1 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
              <Balancer>Add a new blog</Balancer>
            </h1>
          </div>
          <div className="space-y-6 px-4 py-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <h1 className="text-sm text-neutral-900 dark:text-neutral-200">
                  <span className="text-sm font-bold text-neutral-900 dark:text-neutral-200">
                    Author:
                  </span>{' '}
                  {userData?.FirstName} {userData?.LastName}
                </h1>
              </div>
              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="url"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Link
                </label>
                <div className="mt-2 flex rounded-md shadow-xl">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 dark:text-gray-100 sm:text-sm">
                    nextwavestudio.co/blog/
                  </span>
                  <input
                    disabled
                    id="url"
                    name="url"
                    type="text"
                    value={formData.url}
                    onChange={handleChange}
                    className="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-0 bg-neutral-100 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 dark:bg-neutral-800 dark:text-gray-100 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Auto-Generated link to blog.
                </p>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="body"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Body
                </label>
                <div className="mt-2">
                  <BlogEditor
                    value={formData.body}
                    onChange={handleEditorChange}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Blog with embeded styling.
                </p>
              </div>

              <div className="col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
                  <div className="space-y-1 text-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                      className="mx-auto h-12 w-12 text-gray-400"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="coverPhoto"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-amber-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 hover:text-amber-500 dark:bg-neutral-900"
                      >
                        <span>
                          {formData.coverPhoto ? 'Change' : 'Upload a file'}
                        </span>
                        <input
                          id="coverPhoto"
                          name="coverPhoto"
                          type="file"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">
                        {formData.coverPhoto
                          ? formData.coverPhoto.name
                          : 'No file chosen'}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {formData.coverPhoto
                        ? formData.coverPhoto.name
                        : 'PNG, JPG, GIF up to 10MB'}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Thumbnail and Main image of the blog.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Title
                </label>
                <div className="mt-2 flex rounded-md shadow-md">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    className="block w-full min-w-0 flex-grow rounded-md border-0 bg-neutral-100 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-neutral-800 dark:text-gray-100 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">Title of the blog.</p>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Description
                </label>
                <div className="mt-2 flex rounded-md shadow-md">
                  <input
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full min-w-0 flex-grow rounded-md border-0 bg-neutral-100 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-neutral-800 dark:text-gray-100 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Short description of the blog.
                </p>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block w-full min-w-0 flex-grow rounded-md border-0 bg-neutral-100 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-neutral-800 dark:text-gray-100 sm:text-sm sm:leading-6"
                >
                  {status?.map((status, index) => (
                    <option key={index} value={status.Value}>
                      {status.Name}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-gray-500">
                  Status of the blog.
                </p>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full min-w-0 flex-grow rounded-md border-0 bg-neutral-100 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-neutral-800 dark:text-gray-100 sm:text-sm sm:leading-6"
                >
                  {categories?.map((category, index) => (
                    <option key={index} value={category.Name}>
                      {category.Name}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-gray-500">
                  Category of the blog.
                </p>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Language
                </label>
                <div className="mt-2 flex rounded-md shadow-md">
                  <input
                    id="language"
                    name="language"
                    type="text"
                    value={formData.language}
                    onChange={handleChange}
                    className="block w-full min-w-0 flex-grow rounded-md border-0 bg-neutral-100 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-neutral-800 dark:text-gray-100 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Language of the blog.
                </p>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="descriptionTag"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Description Meta Tag
                </label>
                <div className="mt-2 flex rounded-md shadow-md">
                  <input
                    id="descriptionTag"
                    name="descriptionTag"
                    type="text"
                    value={formData.descriptionTag}
                    onChange={handleChange}
                    className="block w-full min-w-0 flex-grow rounded-md border-0 bg-neutral-100 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-neutral-800 dark:text-gray-100 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Description Meta Tag of the blog.
                </p>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="keywords"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Keywords Meta Tag
                </label>
                <div className="mt-2 flex rounded-md shadow-md">
                  <input
                    id="keywords"
                    name="keywords"
                    type="text"
                    value={formData.keywords}
                    onChange={handleChange}
                    className="block w-full min-w-0 flex-grow rounded-md border-0 bg-neutral-100 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-neutral-800 dark:text-gray-100 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Keywords Meta Tag of the blog.
                </p>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="readingTime"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Reading Time
                </label>
                <div className="mt-2 flex rounded-md shadow-md">
                  <input
                    disabled
                    id="readingTime"
                    name="readingTime"
                    type="text"
                    value={formData.readingTime}
                    onChange={handleChange}
                    className="block w-full min-w-0 flex-grow rounded-md border-0 bg-neutral-100 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-neutral-800 dark:text-gray-100 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Auto-Generated avg. reading time.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-100 px-4 py-3 text-right dark:bg-neutral-900 sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              {localLoading ? (
                <PulseLoader size={12} color={'#ffffff'} />
              ) : (
                localLoading === false && 'Create Blog'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
