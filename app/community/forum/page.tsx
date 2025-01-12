import { MessageSquare, Search, Filter, Plus, Users, Clock, Tag, ChevronRight } from "lucide-react";

interface ForumTopic {
  id: string;
  title: string;
  titleAm: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
  category: {
    name: string;
    nameAm: string;
    color: string;
  };
}

const categories = [
  { name: "Safety Tips", nameAm: "የደህንነት ምክሮች", color: "green" },
  { name: "Community Watch", nameAm: "የማህበረሰብ ክትትል", color: "blue" },
  { name: "Emergency Response", nameAm: "የአደጋ ጊዜ ምላሽ", color: "red" },
  { name: "General Discussion", nameAm: "አጠቃላይ ውይይት", color: "purple" }
];

const topics: ForumTopic[] = [
  {
    id: "1",
    title: "Tips for staying safe at night",
    titleAm: "በሌሊት ደህንነትዎን ለመጠበቅ ምክሮች",
    author: "SafetyFirst",
    replies: 24,
    views: 156,
    lastActivity: "2 hours ago",
    category: categories[0]
  },
  {
    id: "2",
    title: "Organizing neighborhood watch program",
    titleAm: "የአካባቢ ጥበቃ ፕሮግራም ማደራጀት",
    author: "CommunityLeader",
    replies: 45,
    views: 230,
    lastActivity: "5 hours ago",
    category: categories[1]
  },
  {
    id: "3",
    title: "Emergency response training schedule",
    titleAm: "የአደጋ ጊዜ ምላሽ ስልጠና መርሃ ግብር",
    author: "EmergencyTeam",
    replies: 18,
    views: 142,
    lastActivity: "1 day ago",
    category: categories[2]
  },
  {
    id: "4",
    title: "Community safety improvements discussion",
    titleAm: "የማህበረሰብ ደህንነት ማሻሻያዎች ውይይት",
    author: "SafetyConcern",
    replies: 32,
    views: 189,
    lastActivity: "2 days ago",
    category: categories[3]
  }
];

const stats = [
  {
    label: "Active Members",
    labelAm: "ንቁ አባላት",
    value: "2,345",
    icon: <Users className="h-4 w-4" />
  },
  {
    label: "Total Topics",
    labelAm: "ጠቅላላ ርዕሶች",
    value: "1,234",
    icon: <MessageSquare className="h-4 w-4" />
  },
  {
    label: "Categories",
    labelAm: "ምድቦች",
    value: categories.length.toString(),
    icon: <Tag className="h-4 w-4" />
  }
];

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 mb-4">
            <MessageSquare className="h-4 w-4" />
            <span>Community Forum</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Community Forum</h1>
          <h2 className="text-2xl font-bold text-green-400 mb-4">የማህበረሰብ መድረክ</h2>
          <p className="text-zinc-400 max-w-3xl mb-2">
            Join the discussion about community safety and crime prevention. Share your thoughts and learn from others.
          </p>
          <p className="text-zinc-500 max-w-3xl">
            ስለ ማህበረሰብ ደህንነት እና የወንጀል መከላከል ውይይት ይቀላቀሉ። ሃሳብዎን ያካፍሉ እና ከሌሎች ይማሩ።
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 bg-zinc-900 rounded-lg border border-zinc-800"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400">
                  {stat.icon}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-zinc-400 text-sm">{stat.label}</span>
                    <span className="text-zinc-500 text-xs">/ {stat.labelAm}</span>
                  </div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search topics / ርዕሶችን ይፈልጉ"
              className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white hover:bg-zinc-800 transition-colors inline-flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              <span className="text-zinc-400 text-sm">/ ማጣሪያ</span>
            </button>
            <button className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors inline-flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>New Topic</span>
              <span className="text-green-200 text-sm">/ አዲስ ርዕስ</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors text-left"
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full bg-${category.color}-400`} />
                <span className="text-white font-medium">{category.name}</span>
              </div>
              <p className="text-zinc-500 text-sm">{category.nameAm}</p>
            </button>
          ))}
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium bg-${topic.category.color}-500/10 text-${topic.category.color}-400`}>
                      {topic.category.name}
                    </div>
                    <span className="text-zinc-500 text-sm">by {topic.author}</span>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    {topic.title}
                  </h3>
                  <h4 className="text-base font-medium text-green-400 mb-3">
                    {topic.titleAm}
                  </h4>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-zinc-400">
                      <MessageSquare className="h-4 w-4 inline mr-1" />
                      {topic.replies} replies
                    </span>
                    <span className="text-zinc-400">
                      <Users className="h-4 w-4 inline mr-1" />
                      {topic.views} views
                    </span>
                    <span className="text-zinc-400">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {topic.lastActivity}
                    </span>
                  </div>
                </div>
                <button className="flex-shrink-0 p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                  <ChevronRight className="h-5 w-5 text-zinc-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 