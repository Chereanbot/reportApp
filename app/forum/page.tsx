import { MessageCircle, Users, Search, PlusCircle } from "lucide-react";

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  replies: number;
  lastActivity: string;
  category: string;
}

const topics: ForumTopic[] = [
  {
    id: 1,
    title: "Neighborhood Watch Program Updates",
    author: "Sarah Johnson",
    replies: 24,
    lastActivity: "2 hours ago",
    category: "Community Safety"
  },
  {
    id: 2,
    title: "Monthly Community Meeting Schedule",
    author: "Mike Peters",
    replies: 15,
    lastActivity: "5 hours ago",
    category: "Announcements"
  },
  {
    id: 3,
    title: "Tips for Home Security",
    author: "David Wilson",
    replies: 32,
    lastActivity: "1 day ago",
    category: "Safety Tips"
  },
  {
    id: 4,
    title: "Local Emergency Response Team Training",
    author: "Emma Davis",
    replies: 18,
    lastActivity: "2 days ago",
    category: "Training"
  }
];

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Community Forum</h1>
          <p className="text-zinc-400 max-w-3xl">
            Connect with your local community, share safety tips, and participate in discussions about making our neighborhood safer.
          </p>
        </div>

        {/* Search and New Topic */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search topics..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <button className="inline-flex items-center justify-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
            <PlusCircle className="h-5 w-5 mr-2" />
            New Topic
          </button>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white hover:text-sky-400 transition-colors">
                    {topic.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-4 text-sm">
                    <span className="text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded">
                      {topic.category}
                    </span>
                    <span className="text-zinc-400">
                      by {topic.author}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-zinc-400">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {topic.replies}
                  </div>
                  <div className="text-right">
                    <div>Last activity</div>
                    <div className="text-zinc-500">{topic.lastActivity}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-3 text-sky-400 mb-4">
              <Users className="h-5 w-5" />
              <h3 className="font-medium">Active Members</h3>
            </div>
            <div className="text-2xl font-bold text-white">2,547</div>
            <div className="text-sm text-zinc-400 mt-1">+123 this week</div>
          </div>
          <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-3 text-sky-400 mb-4">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-medium">Total Topics</h3>
            </div>
            <div className="text-2xl font-bold text-white">856</div>
            <div className="text-sm text-zinc-400 mt-1">+48 this week</div>
          </div>
          <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-3 text-sky-400 mb-4">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-medium">Total Replies</h3>
            </div>
            <div className="text-2xl font-bold text-white">12,847</div>
            <div className="text-sm text-zinc-400 mt-1">+892 this week</div>
          </div>
        </div>
      </div>
    </div>
  );
} 