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
    id: uniqueId(),
    title: 'Templates',
    icon: IconBoxMultiple,
    href: '/templates/',
    children: [
      {
        id: uniqueId(),
        title: 'List',
        icon: IconPoint,
        href: '/templates/list',
      },
      {
        id: uniqueId(),
        title: 'New',
        icon: IconPoint,
        href: '/templates/new',
      },
      {
        id: uniqueId(),
        title: 'Stage',
        icon: IconPoint,
        href: '/templates/stage',
      },
      {
        id: uniqueId(),
        title: 'Detail',
        icon: IconPoint,
        href: '/templates/detail',
      },
    ],
  },
];

export default Menuitems;
