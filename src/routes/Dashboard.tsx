import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import Header from "../components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TodoList from "../components/TodoList";

interface Activity {
  id: number;
  title: string;
  date: Date;
  creator?: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  timestamp: Date;
}

const Dashboard = () => {
  const { session } = UserAuth();
  const [error, setError] = useState<string | null>(null);

  // ----------------- Posts -----------------
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "The Glow-Up Your Social Life Needed",
      content:
        "More laughter. Better plans. Less “we should hang out sometime.” Just meaningful moments and women who show up.",
      image: "src/assets/women002.png",
      timestamp: new Date(),
    },
    {
      id: 2,
      title: "You Don’t Have to Do Life Alone",
      content:
        "Doing life alone is overrated. We’re here for shared wins, real connections, and women who understand the assignment.",
      image: "src/assets/women001.png",
      timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
  ]);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addPost = () => {
    if (!newPostTitle && !newPostContent) return;

    const newPost: Post = {
      id: Date.now(),
      title: newPostTitle || "Untitled",
      content: newPostContent,
      image: newPostImage || undefined,
      timestamp: new Date(),
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostImage(null);
  };

  // ----------------- Personal Calendar -----------------
  const [personalActivities, setPersonalActivities] = useState<Activity[]>([]);
  const [activityTitle, setActivityTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [editId, setEditId] = useState<number | null>(null);

  // ----------------- Global Calendar -----------------
  const [globalActivities, setGlobalActivities] = useState<Activity[]>([
    { id: 1, title: "RSVP Like You Mean It", date: new Date("2026-02-05"), creator: "HER Empire" },
    { id: 2, title: "Step Outside the Everyday", date: new Date("2026-03-07"), creator: "The Velvet Circle" },
    { id: 3, title: "If You Know, You Know", date: new Date("2026-04-10"), creator: "NOIRÈ Femme" },
  ]);

  // ----------------- Session Check -----------------
  useEffect(() => {
    if (!session) {
      setError("Cute screen. Log in to see the good stuff.");
    } else {
      setError(null);
    }
  }, [session]);

  // ----------------- Personal Calendar Functions -----------------
  const saveActivity = () => {
    if (!activityTitle || !selectedDate || !session) return;

    if (editId !== null) {
      setPersonalActivities(
        personalActivities.map((act) =>
          act.id === editId
            ? { ...act, title: activityTitle, date: selectedDate }
            : act
        )
      );
      setEditId(null);
    } else {
      setPersonalActivities([
        ...personalActivities,
        { id: Date.now(), title: activityTitle, date: selectedDate, creator: session.user.email },
      ]);
    }

    setActivityTitle("");
    setSelectedDate(new Date());
  };

  const deletePersonalActivity = (id: number) => {
    setPersonalActivities(personalActivities.filter((a) => a.id !== id));
  };

  const editPersonalActivity = (act: Activity) => {
    setEditId(act.id);
    setActivityTitle(act.title);
    setSelectedDate(act.date);
  };

  // ----------------- Global Calendar Functions -----------------
  const joinGlobalActivity = (act: Activity) => {
    if (!session) return;
    if (personalActivities.some((a) => a.title === act.title && a.date.getTime() === act.date.getTime())) {
      alert("You already joined this activity!");
      return;
    }
    setPersonalActivities([...personalActivities, { ...act, id: Date.now() }]);
  };

  const pushToGlobal = (act: Activity) => {
    if (!session) return;
    setGlobalActivities([...globalActivities, { ...act, id: Date.now(), creator: session.user.email }]);
  };

  const editGlobalActivity = (act: Activity) => {
    setEditId(act.id);
    setActivityTitle(act.title);
    setSelectedDate(act.date);
  };

  const updateGlobalActivity = () => {
    if (editId === null || !selectedDate || !activityTitle) return;
    setGlobalActivities(
      globalActivities.map((act) =>
        act.id === editId ? { ...act, title: activityTitle, date: selectedDate } : act
      )
    );
    setEditId(null);
    setActivityTitle("");
    setSelectedDate(new Date());
  };

  const deleteGlobalActivity = (act: Activity) => {
    if (!session) return;
    if (act.creator !== session.user.email) {
      alert("You can only delete your own activities!");
      return;
    }
    setGlobalActivities(globalActivities.filter((a) => a.id !== act.id));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen px-6 py-10" style={{ backgroundColor: "#fad3d7" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Profile Sidebar */}
          <div className="rounded-3xl shadow-lg p-8 text-center" style={{ backgroundColor: "#ffffff", border: "2px solid #d1898f" }}>
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden" style={{ backgroundColor: "#fad3d7" }}>
              <img src="src/assets/member001.png" alt="👩🏻" className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-4 font-bold text-lg text-black">{session?.user?.email || "Guest"}</h2>
            <p className="text-sm text-gray-500 mt-2">Your space unlocked.</p>

            {/* Stats */}
            <div className="flex justify-around mt-6">
              <div>
                <p className="font-bold" style={{ color: "#d1898f" }}>{posts.length}</p>
                <p className="text-xs text-gray-500">Posts</p>
              </div>
              <div>
                <p className="font-bold" style={{ color: "#d1898f" }}>1.2k</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div>
                <p className="font-bold" style={{ color: "#d1898f" }}>560</p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
            </div>

            <button className="mt-6 w-full py-2 rounded-xl font-semibold shadow-md"
              style={{
                backgroundColor: "#fad3d7",
                color: "#d1898f",
                border: "1px solid #d1898f",
              }}
            >
              Edit Profile
            </button>

            {/* ✅ TODO LIST */}
            <div className="-ml-4">
              <TodoList />
            </div>

          </div>

          {/* Feed + Calendars */}
          <div className="md:col-span-2 space-y-6">

            {/* New Post Form */}
            <div className="rounded-3xl shadow-lg p-6 bg-white border-2 border-pink-300">
              <h3 className="font-bold text-black mb-2">Create New Post</h3>
              <input type="text" placeholder="Title" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} className="border rounded px-2 py-1 w-full mb-2" />
              <textarea placeholder="What's on your mind?" value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} className="border rounded px-2 py-1 w-full mb-2" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
              {newPostImage && <img src={newPostImage} alt="Preview" className="w-32 h-32 object-cover mb-2 rounded" />}
              <button onClick={addPost} className="bg-pink-300 text-white px-4 py-2 rounded">Post</button>              
            </div>

            {/* Personal Posts */}
            <div>
              {posts.map((post) => (
                <div key={post.id} className="rounded-3xl shadow-lg p-6 mb-4 bg-white border-2 border-pink-300">
                  <h3 className="font-bold text-black">{post.title}</h3>
                  <p className="text-xs text-gray-500">{post.timestamp.toLocaleDateString()}</p>
                  {post.image && <img src={post.image} alt="Post Image" className="w-full max-h-64 object-cover rounded my-2" />}
                  <p className="mt-2 text-gray-700">{post.content}</p>
                </div>
              ))}
            </div>

            {/* Global Calendar */}
            <div className="rounded-3xl shadow-lg p-6 bg-white border-2 border-pink-300">
              <h3 className="font-bold text-black mb-4">Global Activities</h3>
              <ul>
                {globalActivities.map((act) => (
                  <li key={act.id} className="flex justify-between items-center mb-2 p-2 bg-gray-50 rounded shadow">
                    <span>{act.title} — {act.date.toLocaleDateString()} {act.creator ? `(by ${act.creator})` : ""}</span>
                    <div className="flex gap-2">
                      <button onClick={() => joinGlobalActivity(act)} className="bg-pink-300 text-white px-3 py-1 rounded">Join</button>
                      {session?.user?.email === act.creator && (
                        <>
                          <button onClick={() => editGlobalActivity(act)} className="text-blue-500 font-bold">✏️</button>
                          <button onClick={() => deleteGlobalActivity(act)} className="text-red-500 font-bold">❌</button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Personal Calendar */}
            <div className="rounded-3xl shadow-lg p-6 bg-white border-2 border-pink-300">
              <h3 className="font-bold text-black mb-4">My Personal Calendar</h3>
              <div className="flex gap-2 mb-4 flex-wrap">
                <input type="text" placeholder="Activity title" value={activityTitle} onChange={(e) => setActivityTitle(e.target.value)} className="border rounded px-2 py-1 flex-1" />
                <DatePicker selected={selectedDate} onChange={(date: Date | null) => setSelectedDate(date)} className="border rounded px-2 py-1" />
                <button onClick={editId !== null ? updateGlobalActivity : saveActivity} className="bg-pink-300 text-white px-4 py-1 rounded">{editId !== null ? "Update" : "Add"}</button>
              </div>
              <ul>
                {personalActivities.map((act) => (
                  <li key={act.id} className="flex justify-between items-center mb-2 p-2 bg-gray-50 rounded shadow">
                    <span>{act.title} — {act.date.toLocaleDateString()}</span>
                    <div className="flex gap-2">
                      <button onClick={() => editPersonalActivity(act)} className="text-blue-500 font-bold">✏️</button>
                      <button onClick={() => deletePersonalActivity(act.id)} className="text-red-500 font-bold">❌</button>
                      <button onClick={() => pushToGlobal(act)} className="text-green-500 px-2 py-1 rounded">🚀</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {error && <p className="text-center text-red-600 text-sm">{error}</p>}

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

