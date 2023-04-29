import React, { useCallback, useEffect, useRef, useState } from "react";
import { Ghost, Outdent } from "lucide-react";

import { useEventListener, useHuddle01 } from "@huddle01/react";
import { Audio, Video } from "@huddle01/react/components";
import { Address, useAccount } from "wagmi";

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
import { routes } from "connectkit/build/components/ConnectKit";
import toast from "react-hot-toast";
import InitHuddle from "@/components/InitHuddle";
import SpeechToText from "@/components/SpeechToText.tsx";
import SelectLanguage from "@/components/SelectLanguage";
import axios from "axios";

type MeetingDetails = {
  roomId: string;
  title: string | null;
  description: string | null;
  meetingLink: string;
  startTime: Date | null;
  expiryTime: Date | null;
  hostWalletAddress: string[];
  roomLocked: boolean;
  videoOnEntry: boolean;
  muteOnEntry: boolean;
};

const App = () => {
  const routes = useRouter();
  const roomId = routes?.query?.roomid as string;
  const { joinLobby } = useLobby();
  const { address } = useAccount();
  const { joinRoom, isRoomJoined } = useRoom();
  const [hasJoined, setHasJoined] = useState(false);

  const [meetingDetails, setMeetingDetails] = useState<MeetingDetails>();

  const { peers } = usePeers();

  useEffect(() => {
    if (!isRoomJoined) {
      if (typeof roomId === "string") {
        joinLobby(roomId);
      }
      joinRoom();
      setHasJoined(true);
    }
  }, [isRoomJoined, hasJoined, roomId, joinLobby, joinRoom]);

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await axios.get(
          `/api/meeting-details?roomId=${roomId}`
        );
        setMeetingDetails(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to get meeting details.");
      }
    };

    if (roomId) {
      fetchMeetingDetails();
    }
  }, [roomId]);

  console.log(meetingDetails?.title);

  const walletAvatar = address?.startsWith("0x") ? address : undefined;

  console.log(peers);
  return (
    <div className="relative overflow-hidden h-screen pb-[40px]">
      <Header />
      <InitHuddle />

      <div className="asbolute ">
        <div className="gradient2"></div>
        <div className="gradient1"></div>
      </div>

      <div className="max-w-[1350px] mx-auto h-full mt-[30px] z-50 relative">
        <div className="mb-[12px] opacity-60">
          <p className="text-[18px]">Meeting: {meetingDetails?.title}</p>
        </div>
        <div className="flex space-x-[20px] h-[400px]">
          <div className="relative w-full border border-white/10 bg-white/5 rounded-[10px] overflow-hidden">
            <VideoCard
              text={"lorejncsjdnchnd"}
              videoRef={null}
              userId={"0xchetan"}
              walletAvatar={`${walletAvatar}`}
              isCameraOn={true}
            />
          </div>
          <div className="relative w-full border border-white/10 bg-white/5 rounded-[10px] overflow-hidden">

            <div className="flex items-center justify-center h-full opacity-60 flex-col">
              <div className="loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <p className="text-[20px] pt-[20px]">
                Waiting For others to join ...
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-[25px] w-full flex items-center justify-between">
          <div className="border border-white/10 px-[20px] py-[8px] rounded-[10px]">
            <p className="opacity-60">Room Id: {roomId}</p>
          </div>
          <div className="absolute flex items-center justify-center w-full">
            <Menu userJoined={true} />
          </div>
          <div>
            <SelectLanguage />
          </div>
        </div>
        <SpeechToText />
      </div>
    </div>
  );
};

export default App;
