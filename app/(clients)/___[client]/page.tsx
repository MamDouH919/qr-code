"use client";
import clients from '@/clients';
import LinkCard from '@/components/LinkCard';
import { Facebook, Home, Info, Instagram, Mail, MapPin, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';
import BranchLocations from './_branches';

const Icons = {
  facebook: {
    size: 20,
    color: '#3b5998',
    icon: Facebook,
  },
  instagram: {
    size: 20,
    color: '#e1306c',
    icon: Instagram,
  },
  x: {
    size: 20,
    color: '#000',
    icon: X,
  },
};

type ClientKey = keyof typeof clients;
type SocialIcon = keyof typeof Icons;

const Page = () => {
  const params = useParams();
  const clientParam = params.client as string; // dynamic route is `[client]`

  // Narrow it down to known keys of `clients`
  const client = clientParam as ClientKey;

  if (!clients[client]) {
    return <div>Client not found</div>;
  }

  return (
    <div className="">
      <div className="relative">
        {/* Background div with 200px height */}
        <div
          className="h-[300px] w-full bg-cover bg-center bg-no-repeat blur-sm"
          style={{
            backgroundImage: `url('/${clientParam}/profile.jpg')`,
          }}
        >
          {/* Optional overlay for better contrast */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Circular profile image positioned to overlap the background */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 h-[200px] w-[200px]">
          <div className="relative">
            <img
              src={`/${clientParam}/profile.jpg`}
              alt="Profile"
              className="h-[100%] w-[100%] rounded-full object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className='h-[120px]' />
      <p className="text-white text-center text-3xl font-bold">
        {clients[client].name}
      </p>

      <div className='px-10'>
        <div className="flex flex-col items-center justify-center gap-4 mt-10">
          {clients[client].socials.map((social, index) => {
            const Icon = Icons[social.icon as SocialIcon];
            return (
              <LinkCard
                key={index}
                name={social.name}
                link={social.link}
                icon={Icon ? <Icon.icon size={25} color={Icon.color} className='font-bold' /> : null}
                color={clients[client].color}
              />
            )
          })}

        </div>
      </div>

      <div className='px-10'>
        <div className="flex flex-col items-center justify-center gap-4 mt-10">
          {clients[client].branches.map((branch, index) => {
            return (
              <LinkCard
                key={index}
                name={branch.branchName}
                link={branch.location}
                icon={<MapPin size={25} color={clients[client].color} className='font-bold' />}
                color={clients[client].color}
              />
            )
          })}
        </div>
      </div>
      <BranchLocations />
    </div>
  );
};

export default Page;
