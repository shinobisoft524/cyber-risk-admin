import { uniqueId } from 'lodash';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconAperture,
} from '@tabler/icons-react';

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: 'Dashboard',
  },
  {
    id: uniqueId(),
    title: 'Organisations',
    icon: IconBoxMultiple,
    href: '/organisations/',
    children: [
      {
        id: uniqueId(),
        title: 'List',
        icon: IconPoint,
        href: '/organisations/list',
      },
      {
        id: uniqueId(),
        title: 'Detail',
        icon: IconPoint,
        href: '/organisations/detail',
      },
    ],
  },
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAperture,
    href: '/',
    chip: 'New',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Sample page',
    icon: IconAperture,
    href: '/sample-page',
  },

  {
    id: uniqueId(),
    title: 'Disabled',
    icon: IconBan,
    href: '',
    disabled: true,
  },
  {
    id: uniqueId(),
    title: 'SubCaption',
    subtitle: 'This is the sutitle',
    icon: IconStar,
    href: '',
  },

  {
    id: uniqueId(),
    title: 'Chip',
    icon: IconAward,
    href: '',
    chip: '9',
    chipColor: 'primary',
  },
  {
    id: uniqueId(),
    title: 'Outlined',
    icon: IconMoodSmile,
    href: '',
    chip: 'outline',
    variant: 'outlined',
    chipColor: 'primary',
  },
  {
    id: uniqueId(),
    title: 'External Link',
    external: true,
    icon: IconStar,
    href: 'https://google.com',
  },
];

export default Menuitems;
