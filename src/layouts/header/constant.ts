import { LocaleKeys } from '@/types/locales'

export const getNavItems = (dictionary: LocaleKeys) => {
  return [
    {
      label: dictionary['About us'],
      href: '#',
    },
    {
      label: dictionary.Service,
      href: '#',
      childs: [
        {
          label: dictionary.Outsource,
          href: '#',
        },
        {
          label: dictionary.Product,
          href: '#',
        },
        {
          label: dictionary.Investment,
          href: '#',
        },
        {
          label: dictionary.Assistance,
          href: '#',
        },
      ],
    },
    {
      label: dictionary.Team,
      href: '#',
    },
    {
      label: dictionary.Menu,
      href: '#',
      childs: [
        {
          label: dictionary.FAQs,
          href: '#',
        },
        {
          label: dictionary['Privacy & Policy'],
          href: '#',
        },
      ],
    },
  ]
}
