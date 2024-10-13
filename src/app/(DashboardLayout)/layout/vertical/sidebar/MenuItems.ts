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
    title: 'Assessments',
    icon: IconBoxMultiple,
    href: '/assessment/',
    children: [
      {
        id: uniqueId(),
        title: 'List',
        icon: IconPoint,
        href: '/assessment/list',
      },
      {
        id: uniqueId(),
        title: 'Create',
        icon: IconPoint,
        href: '/assessment/create',
      },
      {
        id: uniqueId(),
        title: 'Assessment 15',
        icon: IconPoint,
        href: '/l1.1',
        children: [
          {
            id: uniqueId(),
            title: 'View',
            icon: IconPoint,
            href: '/assessment/view',
          },
          {
            id: uniqueId(),
            title: 'Edit',
            icon: IconPoint,
            href: '/l2',
          },
        ],
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
