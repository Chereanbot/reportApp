import { Calendar, MapPin, Clock, Users, Search, Filter, ChevronRight } from "lucide-react";

interface Event {
  id: string;
  title: string;
  titleAm: string;
  date: string;
  time: string;
  location: string;
  locationAm: string;
  category: string;
  categoryAm: string;
  attendees: number;
  maxAttendees: number;
  description: string;
  descriptionAm: string;
}

const categories = [
  "All Events",
  "Workshop",
  "Training",
  "Seminar",
  "Youth Program",
  "Meeting"
];

const categoriesAm = [
  "ሁሉም ዝግጅቶች",
  "ወርክሾፕ",
  "ስልጠና",
  "ሴሚናር",
  "የወጣቶች ፕሮግራም",
  "ስብሰባ"
];

const events: Event[] = [
  {
    id: "1",
    title: "Community Safety Workshop",
    titleAm: "የማህበረሰብ ደህንነት ወርክሾፕ",
    date: "2024-01-20",
    time: "14:00",
    location: "Addis Ababa Community Center",
    locationAm: "አዲስ አበባ የማህበረሰብ ማዕከል",
    category: "Workshop",
    categoryAm: "ወርክሾፕ",
    attendees: 45,
    maxAttendees: 50,
    description: "Learn essential safety tips and best practices for community protection.",
    descriptionAm: "አስፈላጊ የደህንነት ምክሮችን እና የማህበረሰብ ጥበቃ ምርጥ ልምዶችን ይማሩ።"
  },
  {
    id: "2",
    title: "Emergency Response Training",
    titleAm: "የአደጋ ጊዜ ምላሽ ስልጠና",
    date: "2024-01-25",
    time: "09:00",
    location: "Ethiopian Red Cross Society",
    locationAm: "የኢትዮጵያ ቀይ መስቀል ማህበር",
    category: "Training",
    categoryAm: "ስልጠና",
    attendees: 28,
    maxAttendees: 30,
    description: "Hands-on training for emergency response and first aid.",
    descriptionAm: "ለአደጋ ጊዜ ምላሽ እና የመጀመሪያ እርዳታ የተግባር ስልጠና።"
  },
  {
    id: "3",
    title: "Youth Safety Awareness Program",
    titleAm: "የወጣቶች ደህንነት ግንዛቤ ፕሮግራም",
    date: "2024-02-01",
    time: "15:30",
    location: "Bole Youth Center",
    locationAm: "ቦሌ የወጣቶች ማዕከል",
    category: "Youth Program",
    categoryAm: "የወጣቶች ፕሮግራም",
    attendees: 85,
    maxAttendees: 100,
    description: "Special program for youth focusing on personal safety and awareness.",
    descriptionAm: "በግል ደህንነት እና ግንዛቤ ላይ የሚያተኩር ለወጣቶች የተዘጋጀ ልዩ ፕሮግራም።"
  },
  {
    id: "4",
    title: "Community Watch Meeting",
    titleAm: "የማህበረሰብ ክትትል ስብሰባ",
    date: "2024-02-05",
    time: "18:00",
    location: "Kirkos Sub-city Hall",
    locationAm: "ቂርቆስ ክፍለ ከተማ አዳራሽ",
    category: "Meeting",
    categoryAm: "ስብሰባ",
    attendees: 32,
    maxAttendees: 40,
    description: "Monthly meeting to discuss community safety concerns and strategies.",
    descriptionAm: "የማህበረሰብ ደህንነት ጉዳዮችን እና ስትራቴጂዎችን ለመወያየት የሚደረግ ወርሃዊ ስብሰባ።"
  }
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 mb-4">
            <Calendar className="h-4 w-4" />
            <span>Safety Events</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Safety Events</h1>
          <h2 className="text-2xl font-bold text-green-400 mb-4">የደህንነት ዝግጅቶች</h2>
          <p className="text-zinc-400 max-w-3xl mb-2">
            Join community safety events, workshops, and training programs. Register to participate and learn valuable safety skills.
          </p>
          <p className="text-zinc-500 max-w-3xl">
            የማህበረሰብ ደህንነት ዝግጅቶች፣ ወርክሾፖች እና የስልጠና ፕሮግራሞችን ይቀላቀሉ። ለመሳተፍ ይመዝገቡ እና ጠቃሚ የደህንነት ክህሎቶችን ይማሩ።
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search events / ዝግጅቶችን ይፈልጉ"
              className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white hover:bg-zinc-800 transition-colors inline-flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            <span className="text-zinc-400 text-sm">/ ማጣሪያ</span>
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                index === 0
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              <span>{category}</span>
              <span className="text-zinc-500 text-xs ml-1">/ {categoriesAm[index]}</span>
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Date */}
                <div className="flex-shrink-0 w-20 h-20 bg-green-500/10 rounded-lg flex flex-col items-center justify-center text-green-400">
                  <Calendar className="h-6 w-6 mb-1" />
                  <div className="text-sm font-medium">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric"
                    })}
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                      {event.category} / {event.categoryAm}
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    {event.title}
                  </h3>
                  <h4 className="text-base font-medium text-green-400 mb-3">
                    {event.titleAm}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <MapPin className="h-4 w-4" />
                      <div>
                        <span>{event.location}</span>
                        <span className="text-zinc-500 text-xs ml-1">/ {event.locationAm}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.attendees}/{event.maxAttendees} Attendees
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-zinc-400 mb-1">{event.description}</p>
                    <p className="text-sm text-zinc-500">{event.descriptionAm}</p>
                  </div>
                </div>

                {/* Register Button */}
                <div className="flex-shrink-0">
                  <button className="w-full sm:w-auto px-6 py-3 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors inline-flex items-center justify-center gap-2">
                    <span>Register</span>
                    <span className="text-green-200 text-sm">/ ይመዝገቡ</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 