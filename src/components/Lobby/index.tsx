import React, { useEffect, useRef, useState } from "react";
import { Ghost, Outdent, Pencil } from "lucide-react";

import { useEventListener, useHuddle01 } from "@huddle01/react";
import { Audio, Video } from "@huddle01/react/components";
import Address, { useAccount } from "wagmi";

import {
  useAudio,
  useLobby,
  useMeetingMachine,
  usePeers,
  useRoom,
  useVideo,
  useRecording,
} from "@huddle01/react/hooks";

import { useDisplayName } from "@huddle01/react/app-utils";
import Button from "../../components/Button";
import Header from "../../components/Header";
import VideoCard from "../../components/Modals/VideoCard";
import Menu from "../../components/Menu";
import { Avatar } from "connectkit";
import Router, { useRouter } from "next/router";

type LobbyProps = {};

const App = ({}: LobbyProps) => {
  const route = useRouter();
  const { roomid } = route.query;
  const [roomId] = useState(roomid);
  const { joinRoom, leaveRoom } = useRoom();

  console.log(roomId);

  useEffect(() => {
    // Router.replace(`/${roomId}`)
  });

  return (
    <div className="max-w-[1350px] mt-[110px] mx-auto   z-50 relative">
      <div className="flex space-x-[20px] h-[470px]">
        <div className="relative w-full">
          <div className=" border h-full relative border-white/10 bg-white/5 rounded-[10px] overflow-hidden">
            <VideoCard
              text={""}
              videoRef={null}
              userId={"0xchetan"}
              isCameraOn={true}
              walletAvatar={""}
            />
          </div>
          <div className="flex items-center justify-center mt-[20px]">
            <Menu userJoined={true} />
          </div>
        </div>
        <div className="relative  w-full flex items-center justify-center space-y-[10px] flex-col rounded-[10px] overflow-hidden ">
          <div className="max-w-[400px]">
            <p className="text-[28px] font-bold opacity-90 ">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                GM Buildoors
              </span>{" "}
              <span>🌞</span>
            </p>
            <h3>Lobby beside route</h3>
            <p className="mt-[10px] opacity-70 text-[14px]">
              Lets make sure youre not having a bad hair day 💇‍♂️ or broadcasting
              a messy house 🏠 to the world 🌎 - do a quick hair check and tidy
              up any evidence of your untidy lifestyle 🧹.
            </p>

            <div>
              <Button onClick={() => joinRoom()}>Enter Room</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
