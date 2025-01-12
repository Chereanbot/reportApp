import { Calendar, MapPin, Clock, Users, Search, Filter, ChevronRight } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  description: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Community Safety Workshop",
    date: "March 15, 2024",
    time: "2:00 PM - 4:00 PM",
    location: "Community Center, 123 Main St",
    category: "Workshop",
    attendees: 45,
    description: "Learn essential safety tips and best practices from local law enforcement officers."
  },
  {
    id: 2,
    title: "Neighborhood Watch Training",
    date: "March 18, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Police Station, 456 Oak Ave",
    category: "Training",
    attendees: 32,
    description: "Training session for new neighborhood watch volunteers."
  },
  {
    id: 3,
    title: "Emergency Preparedness Seminar",
    date: "March 22, 2024",
    time: "10:00 AM - 12:00 PM",
    location: "City Hall, 789 Civic Center Dr",
    category: "Seminar",
    attendees: 78,
    description: "Learn how to prepare for and respond to various emergency situations."
  },
  {
    id: 4,
    title: "Youth Safety Program",
    date: "March 25, 2024",
    time: "3:30 PM - 5:30 PM",
    location: "Local High School, 321 Education Blvd",
    category: "Youth Program",
    attendees: 60,
    description: "Safety awareness program designed specifically for teenagers and young adults."
  }
];

const categories = ["All Events", "Workshop", "Training", "Seminar", "Youth Program", "Meeting"];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Safety Events</h1>
          <p className="text-zinc-400 max-w-3xl">
            Join community safety events, workshops, and training sessions. Stay informed and help make our community safer.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <button className="inline-flex items-center justify-center px-4 py-2 bg-zinc-900 text-white rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                index === 0
                  ? "bg-sky-500 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-6 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-sky-400 mb-2">
                    <span className="px-2 py-1 rounded-full bg-sky-400/10">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {event.attendees} attending
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                    Register
                    <ChevronRight className="h-4 w-4 ml-2" />
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