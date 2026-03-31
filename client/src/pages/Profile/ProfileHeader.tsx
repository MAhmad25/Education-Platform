import type { User } from "../../context/AuthContext";

interface ProfileHeaderProps {
  user: User;
  onSwitchRole: () => void;
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function formatJoinDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function ProfileHeader({ user, onSwitchRole }: ProfileHeaderProps) {
  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  return (
    <div className="px-[5vw] py-[6vw]">
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-24 h-24 rounded-full border-2 border-[#f9f5cb] object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-2 border-[#f9f5cb] bg-[#ff5718] flex items-center justify-center">
              <span className="text-[#f9f5cb] font-mono text-2xl uppercase">
                {getInitials(user.firstName, user.lastName)}
              </span>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
            <h1 className="font-serif text-4xl text-[#f9f5cb]">
              {user.firstName} {user.lastName}
            </h1>
            <span className="font-mono text-sm uppercase border-2 border-[#ff5718] text-[#ff5718] px-3 py-1 w-fit">
              [ {user.role === "student" ? "STUDENT" : "TEACHER"} ]
            </span>
          </div>

          <p className="text-[#a1928b] mb-3">{user.email}</p>

          {user.bio && (
            <p className="text-[#f9f5cb] mb-3 max-w-2xl">{user.bio}</p>
          )}

          <p className="text-[#a1928b] text-sm mb-6">
            Member since {formatJoinDate(user.joinDate)}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleEditProfile}
              className="font-mono text-sm uppercase tracking-wide border-2 border-[#f9f5cb] text-[#f9f5cb] px-6 py-3 hover:bg-[#f9f5cb] hover:text-[#271814] transition-colors"
            >
              [ EDIT PROFILE ]
            </button>
            <button
              onClick={onSwitchRole}
              className="font-mono text-sm uppercase tracking-wide border-2 border-[#f9f5cb] text-[#f9f5cb] px-6 py-3 hover:bg-[#f9f5cb] hover:text-[#271814] transition-colors"
            >
              [ SWITCH TO {user.role === "student" ? "TEACHER" : "STUDENT"} ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
