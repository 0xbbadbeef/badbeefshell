import React from 'react';

import { TerminalButton } from 'components';
import { USER_STRING } from 'consts';

const currentTime = new Date();

interface IClickableLink {
    href: string,
    children: string,
    newTab?: boolean,
}

export const CLICKABLE_LINKS: IClickableLink[] = [
    {
        href: 'https://grandetravel.badbeef.io',
        children: 'GrandeTravel',
        newTab: true,
    },
    {
        href: 'http://files.badbeef.io/c/planets-prototype.zip',
        children: 'Planets (Download, Unity Proto)'
    },
    {
        href: 'http://files.badbeef.io/c/Year12-Canvas.zip',
        children: 'Canvas (Download, VB6 Scratch Clone)',
    },
    {
        href: 'https://github.com/0xbbadbeef',
        children: 'GitHub',
        newTab: true,
    },
    {
        href: 'https://github.com/0xbbadbeef/badbeefshell',
        children: 'Source (of this page)',
        newTab: true,
    }
]

const getLines = () => ([
    'Initialising 0xbbadbeef terminal..',
    'Done!',
    <hr />,
    '> login as: root',
    '> root@0xbbadbeef\'s password: ********',
    <p />,
    'Determining credentials',
    <hr />,
    <p />,
    `Last login: ${currentTime.toDateString()} ${currentTime.toLocaleTimeString()}`,
    <p />,
    `${USER_STRING()} cd IntroStuff/`,
    `${USER_STRING('/IntroStuff')} cat README.txt`,
    'Welcome to badbeef.io! This is the home for all things John.',
    'You can find various projects that I\'ve done here.',
    <p />,
    'What would you like to look at first?',
    <p />,
    ...CLICKABLE_LINKS.map(item =>
        <TerminalButton {...item} />
    ),
    <p />,
    'Or you could start typing your own command here, get started with \'help\'!',
]);

export default getLines;