import React from "react";
import {
  RouterProvider,
  createRoutesFromElements,
  Route,
  createHashRouter,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Home/Home";
import RoomType from "./RoomSection/RoomType";
import RoomPlay from "./RoomSection/RoomPlay";
import SocketContextHandle from "./APIS/SocketContext";
import Feeds from "./Feeds/feeds-page";
import FeedsLayout from "./Layout/FeedsLayout";
import ChatSection from "./Chat-section/ChatSection";
import Chat from "./Chat-section/Chat";
import ProfilePage from "./Feeds/Profile/ProfilePage";
import ProfileImages from "./Feeds/Profile/Profile-details-type/Profile-images";
import ProfileVideos from "./Feeds/Profile/Profile-details-type/Profile-videos";
import LandPage from "./landPage";
import { auth } from "./APIS/auth";
import Register from "./Start-Screenmate/Register";
import Login from "./Start-Screenmate/Login";
import Contact from "./Contact/Contact";
import NotificationPage from "./Feeds/Notifications-section/NotificationPage.jsx/NotificationPage";
import FriendPage from "./Feeds/friends-section/FriendPage";
import PostDetails from "./Feeds/main-feed-content/Posts-section/comments/PostDetails";

export default function App() {
  console.log(
    "%c%c%c %cImportant:%c This is Beta Version, انا تعبان",
    "color: white; font-size: 24px",
    "color: white; font-size: 24px",
    "color: white; font-size: 24px",
    "color: red; font-size: 24px; font-weight: bold",
    "color: white; font-size: 24px"
  );

  const router = createHashRouter(
    createRoutesFromElements(
      <>
        <Route path="/start" element={<LandPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />} loader={auth}>
          <Route index element={<Home />} />
          <Route path="rooms" element={<RoomType />} />
          <Route path="chat" element={<ChatSection />} />
          <Route path="room-player" element={<RoomPlay />} />
          <Route path="chat/chat-connected" element={<Chat />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/feeds" element={<FeedsLayout />}>
            <Route key="feeds" index element={<Feeds />} />
            <Route path="post/:id" element={<PostDetails />} />
            <Route path="notification" element={<NotificationPage />} />
            <Route path="friends" element={<FriendPage />} />
          </Route>
        </Route>
      </>
    )
  );
  return (
    <SocketContextHandle>
      <RouterProvider router={router} />
    </SocketContextHandle>
  );
}
