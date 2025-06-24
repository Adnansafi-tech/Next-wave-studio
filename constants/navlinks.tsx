import {
    IconChartBar,
    Icon123,
    IconCubePlus,
    IconLink,
    IconUsers,
    IconId,
    IconDots,
    IconTextResize,
    IconDatabase,
    IconBinaryTree,
    IconProps,
    Icon
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface Navlink {
    href: string;
    label: string;
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    clickable?: boolean;
}

export const navlinks: Navlink[] = [
    {
        href: "Ai",
        label: "AI Generation",
        icon: IconBinaryTree,
    },
    {
        href: "Data",
        label: "Data",
        icon: IconDatabase,
    },
    {
        href: "Texteditor",
        label: "Text Editor",
        icon: IconTextResize,
    },
    {
        href: "Card",
        label: "Cards",
        icon: IconId,
    },
    {
        href: "People",
        label: "People",
        icon: IconUsers,
    },
    {
        href: "Charts",
        label: "Charts",
        icon: IconChartBar,
    },
    {
        href: "Numbers",
        label: "Numbers",
        icon: Icon123,
    },
    {
        href: "Embed",
        label: "Embeds",
        icon: IconLink,
    },
    {
        href: "Vote",
        label: "Votes",
        icon: IconCubePlus,
    },
    {
        href: "More",
        label: "More",
        icon: IconDots,
        clickable: false
    },
];
