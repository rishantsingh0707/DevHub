import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { useActiveSessions, useCreateSession, useMyRecentSessions, } from '../hooks/useSession'
import WelcomeSection from '../components/WelcomeSection';
import StatsCards from "../components/StatsCards.jsx";
import ActiveSessions from "../components/ActiveSessions.jsx";
import RecentSessions from "../components/RecentSessions.jsx";
import CreateSessionModal from "../components/CreateSessionModal.jsx";

function DashBoardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const createSessionMutation = useCreateSession();
  const { data: ActiveSessionData, isLoading: loadingActiveSessions } = useActiveSessions();

  const { data: RecentSessionData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          console.log("create session response:", data);

          setShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };


  // Safely access session data
  const activeSessions = ActiveSessionData?.sessions || [];
  const recentSessions = RecentSessionData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user) return false;

    return session.host?.clerkId === user.id || session.participants?.clerkId === user.id;
  }
  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

        {/* Grid layout */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsCards
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={recentSessions.length}
            />
            <ActiveSessions
              sessions={activeSessions}
              isLoading={loadingActiveSessions}
              isUserInSession={isUserInSession}
            />
          </div>

          <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateSession={handleCreateRoom}
      // isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashBoardPage
