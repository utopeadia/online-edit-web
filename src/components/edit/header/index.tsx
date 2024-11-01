import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { VscLiveShare } from 'react-icons/vsc';
import { FaGithub, FaRegSave } from 'react-icons/fa';
import { GoRepoForked } from 'react-icons/go';
import localforage from 'localforage';

import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/ui/button';
import AvatarPopover from '@/components/avatarPopover';
import WebContainerProvider from '@/components/webContainerProvider';

interface UserInfo {
  [key: string]: any;
}
interface HeaderProps {
  userInfo: UserInfo;
  projectId: string;
}

export const Header: React.FC<HeaderProps> = ({ projectId }) => {
  const [projectName, setProjectName] = useState('');
  useEffect(() => {
    const fetchProjectData = async () => {
      const projectData = await localforage.getItem(projectId);

      if (projectData) {
        const parsedData = JSON.parse(projectData as string);
        setProjectName(parsedData.name);
      }
    };

    fetchProjectData();
  }, []);

  return (
    <header className=" relative flex flex-row items-center w-[100vw] justify-between bg-transparent py-4">
      <Link className=" text-white font-bold ml-3" href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#1389FD"
          viewBox="0 0 32 32"
          width="1.5em"
          height="1.5em"
        >
          <path d="M5.853 18.647h8.735L9.45 31l16.697-17.647h-8.735L22.55 1z"></path>
        </svg>
      </Link>
      <div className=" flex items-center gap-x-2 mr-auto ml-2">
        <Button className=" flex gap-x-2 font-[300] bg-transparent text-white" disabled>
          <FaRegSave />
          Save
        </Button>
        <Button className=" flex gap-2 w-24 h-[4vh] font-[300] bg-transparent text-white hover:bg-gray-600/30 hover:border-[white]/20 hover:border-[1px]">
          <VscLiveShare />
          share
        </Button>
        <Button className=" flex gap-x-2 w-20 h-[4vh] font-[300] bg-transparent text-white hover:bg-gray-600/30 hover:border-[white]/20 hover:border-[1px]">
          <GoRepoForked />
          fork
        </Button>
      </div>
      <div className=" flex items-center justify-center w-full absolute leading-[5vh] font-[500] text-[16px] pointer-events-none">
        {projectName}
      </div>
      <div className=" mr-6">
        <a href={'https://github.com/xun082/online-edit-web'} className="p-2 rounded-md">
          <FaGithub className="w-[3.6vh] h-[3.6vh]" />
        </a>
      </div>
      <div className="mr-4">
        <AvatarPopover>
          <Avatar src="/kunkun.gif" className=" flex h-[3.6vh] w-[3.6vh]" />
        </AvatarPopover>
      </div>
      <WebContainerProvider projectId={projectId}></WebContainerProvider>
    </header>
  );
};
