import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileHeader from "./ProfileHeader";
import CourseUploadForm from "./CourseUploadForm";

interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  image: string;
}

interface PublishedCourse {
  id: string;
  title: string;
  students: number;
  rating: number;
  status: "published" | "draft";
}

const ENROLLED_COURSES: EnrolledCourse[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    instructor: "Alex Rivera",
    progress: 72,
    image: "",
  },
  {
    id: "2",
    title: "TypeScript Mastery",
    instructor: "Sarah Chen",
    progress: 45,
    image: "",
  },
  {
    id: "3",
    title: "Node.js Architecture",
    instructor: "James Liu",
    progress: 91,
    image: "",
  },
];

const PUBLISHED_COURSES: PublishedCourse[] = [
  {
    id: "1",
    title: "Full-Stack Development Bootcamp",
    students: 342,
    rating: 4.9,
    status: "published",
  },
  {
    id: "2",
    title: "React Performance Optimization",
    students: 186,
    rating: 4.7,
    status: "published",
  },
  {
    id: "3",
    title: "Building REST APIs with Node.js",
    students: 0,
    rating: 0,
    status: "draft",
  },
];

function StudentStats() {
  return (
    <div className="grid grid-cols-3 border-y-2 border-[#f9f5cb]">
      <div className="border-r-2 border-[#f9f5cb] px-4 py-8 text-center">
        <p className="font-serif text-4xl md:text-5xl text-[#f9f5cb] mb-2">5</p>
        <p className="font-mono text-xs uppercase text-[#a1928b]">
          Courses Enrolled
        </p>
      </div>
      <div className="border-r-2 border-[#f9f5cb] px-4 py-8 text-center">
        <p className="font-serif text-4xl md:text-5xl text-[#f9f5cb] mb-2">
          128
        </p>
        <p className="font-mono text-xs uppercase text-[#a1928b]">
          Hours Learned
        </p>
      </div>
      <div className="px-4 py-8 text-center">
        <p className="font-serif text-4xl md:text-5xl text-[#f9f5cb] mb-2">3</p>
        <p className="font-mono text-xs uppercase text-[#a1928b]">
          Certificates
        </p>
      </div>
    </div>
  );
}

function TeacherStats() {
  return (
    <div className="grid grid-cols-3 border-y-2 border-[#f9f5cb]">
      <div className="border-r-2 border-[#f9f5cb] px-4 py-8 text-center">
        <p className="font-serif text-4xl md:text-5xl text-[#f9f5cb] mb-2">
          1,240
        </p>
        <p className="font-mono text-xs uppercase text-[#a1928b]">
          Total Students
        </p>
      </div>
      <div className="border-r-2 border-[#f9f5cb] px-4 py-8 text-center">
        <p className="font-serif text-4xl md:text-5xl text-[#f9f5cb] mb-2">8</p>
        <p className="font-mono text-xs uppercase text-[#a1928b]">
          Courses Published
        </p>
      </div>
      <div className="px-4 py-8 text-center">
        <p className="font-serif text-4xl md:text-5xl text-[#f9f5cb] mb-2">
          4.8<span className="text-[#ff5718]">★</span>
        </p>
        <p className="font-mono text-xs uppercase text-[#a1928b]">
          Avg. Rating
        </p>
      </div>
    </div>
  );
}

function EnrolledCourseCard({ course }: { course: EnrolledCourse }) {
  return (
    <div className="border-2 border-[#f9f5cb] overflow-hidden">
      {/* Image Placeholder */}
      <div className="h-40 bg-[#3a2a24] flex items-center justify-center">
        {course.image ? (
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-mono text-[#a1928b] text-sm">
            [ COURSE IMAGE ]
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-serif text-xl text-[#f9f5cb] mb-2">
          {course.title}
        </h3>
        <p className="font-mono text-sm text-[#a1928b] mb-4">
          {course.instructor}
        </p>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-mono text-[#a1928b] uppercase">Progress</span>
            <span className="font-mono text-[#f9f5cb]">{course.progress}%</span>
          </div>
          <div className="h-2 bg-[#3a2a24] border border-[#f9f5cb]">
            <div
              className="h-full bg-[#ff5718] transition-all duration-300"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PublishedCourseCard({ course }: { course: PublishedCourse }) {
  return (
    <div className="border-2 border-[#f9f5cb] p-4">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-serif text-xl text-[#f9f5cb]">{course.title}</h3>
        <span
          className={`font-mono text-xs uppercase px-2 py-1 border-2 ${
            course.status === "published"
              ? "border-green-500 text-green-500"
              : "border-[#a1928b] text-[#a1928b]"
          }`}
        >
          [ {course.status.toUpperCase()} ]
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-mono text-sm text-[#a1928b] uppercase">
            Students
          </span>
          <span className="font-mono text-sm text-[#f9f5cb]">
            {course.students.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-mono text-sm text-[#a1928b] uppercase">
            Rating
          </span>
          <span className="font-mono text-sm text-[#f9f5cb]">
            {course.rating > 0 ? `${course.rating}★` : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

function StudentContent() {
  return (
    <div className="px-[5vw] py-[6vw]">
      <h2 className="font-mono text-sm uppercase tracking-wide text-[#a1928b] mb-8">
        [ ENROLLED COURSES ]
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {ENROLLED_COURSES.map((course) => (
          <EnrolledCourseCard key={course.id} course={course} />
        ))}
      </div>

      <Link
        to="/courses"
        className="inline-block font-mono text-sm uppercase tracking-wide bg-[#ff5718] text-[#f9f5cb] px-8 py-4 border-2 border-[#ff5718] hover:bg-transparent hover:text-[#ff5718] transition-colors"
      >
        [ BROWSE MORE COURSES ]
      </Link>
    </div>
  );
}

function TeacherContent() {
  return (
    <div>
      {/* My Courses Section */}
      <div className="px-[5vw] py-[6vw]">
        <h2 className="font-mono text-sm uppercase tracking-wide text-[#a1928b] mb-8">
          [ MY COURSES ]
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {PUBLISHED_COURSES.map((course) => (
            <PublishedCourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* Upload Form Section */}
      <div className="border-t-2 border-[#f9f5cb] px-[5vw] py-[6vw]">
        <h2 className="font-serif text-3xl text-[#f9f5cb] mb-8">
          [ UPLOAD NEW COURSE ]
        </h2>
        <CourseUploadForm />
      </div>
    </div>
  );
}

export default function Profile() {
  const { user, isAuthenticated, switchRole } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-[#271814] min-h-screen text-[#f9f5cb] pt-[54px] flex items-center justify-center">
        <div className="text-center px-[5vw]">
          <h1 className="font-serif text-4xl mb-4">Please Sign In</h1>
          <p className="text-[#a1928b] mb-8">
            You need to be signed in to view your profile.
          </p>
          <Link
            to="/login"
            className="inline-block font-mono text-sm uppercase tracking-wide bg-[#ff5718] text-[#f9f5cb] px-8 py-4 border-2 border-[#ff5718] hover:bg-transparent hover:text-[#ff5718] transition-colors"
          >
            [ SIGN IN ]
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#271814] min-h-screen text-[#f9f5cb] pt-[54px]">
      {/* Profile Header */}
      <ProfileHeader user={user} onSwitchRole={switchRole} />

      {/* Stats Strip */}
      {user.role === "student" ? <StudentStats /> : <TeacherStats />}

      {/* Role-Based Content */}
      {user.role === "student" ? <StudentContent /> : <TeacherContent />}
    </div>
  );
}
