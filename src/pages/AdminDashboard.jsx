import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Music,
  Star,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Edit,
  Clock,
  Send,
  LogOut,
  RefreshCw
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');

  // Stats Data
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [performanceRequests, setPerformanceRequests] = useState([]);
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Course Form State
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    code: '',
    category: 'Prarambhik (Beginner)',
    level: 'Beginner',
    durationMonths: 6,
    feeMonthly: 3000,
    description: '',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&q=80&w=800',
  });

  // New Gallery Item State
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    category: 'Performances',
    imageUrl: '',
    caption: '',
    eventDate: '',
  });

  useEffect(() => {
    fetchAllAdminData();
  }, []);

  const fetchAllAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, appRes, perfRes, courseRes, revRes, galRes] = await Promise.all([
        API.get('/stats/dashboard'),
        API.get('/bookings/applications'),
        API.get('/performance-requests'),
        API.get('/courses?all=true'),
        API.get('/reviews?all=true'),
        API.get('/gallery'),
      ]);

      if (statsRes.data.success) setStats(statsRes.data.data);
      if (appRes.data.success) setApplications(appRes.data.data);
      if (perfRes.data.success) setPerformanceRequests(perfRes.data.data);
      if (courseRes.data.success) setCourses(courseRes.data.data);
      if (revRes.data.success) setReviews(revRes.data.data);
      if (galRes.data.success) setGallery(galRes.data.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Status Update Handlers
  const handleUpdateAppStatus = async (appId, newStatus) => {
    try {
      const res = await API.patch(`/bookings/applications/${appId}/status`, { status: newStatus });
      if (res.data.success) {
        setApplications(applications.map((a) => (a._id === appId ? { ...a, status: newStatus } : a)));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleUpdatePerfStatus = async (reqId, newStatus) => {
    try {
      const res = await API.patch(`/performance-requests/${reqId}/status`, { status: newStatus });
      if (res.data.success) {
        setPerformanceRequests(performanceRequests.map((p) => (p._id === reqId ? { ...p, status: newStatus } : p)));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleToggleReviewApprove = async (revId) => {
    try {
      const res = await API.patch(`/reviews/${revId}/approve`);
      if (res.data.success) {
        setReviews(reviews.map((r) => (r._id === revId ? { ...r, isApproved: !r.isApproved } : r)));
      }
    } catch (err) {
      alert('Failed to toggle review approval');
    }
  };

  const handleDeleteReview = async (revId) => {
    if (!window.confirm('Delete this review permanently?')) return;
    try {
      await API.delete(`/reviews/${revId}`);
      setReviews(reviews.filter((r) => r._id !== revId));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Delete this course and all associated timing slots?')) return;
    try {
      await API.delete(`/courses/${courseId}`);
      setCourses(courses.filter((c) => c._id !== courseId));
    } catch (err) {
      alert('Delete course failed');
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/courses', newCourse);
      if (res.data.success) {
        setCourses([res.data.data, ...courses]);
        setIsAddCourseModalOpen(false);
        setNewCourse({
          title: '',
          code: '',
          category: 'Prarambhik (Beginner)',
          level: 'Beginner',
          durationMonths: 6,
          feeMonthly: 3000,
          description: '',
          badge: 'Popular',
          image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&q=80&w=800',
        });
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create course');
    }
  };

  const handleCreateGalleryItem = async (e) => {
    e.preventDefault();
    if (!newGalleryItem.title || !newGalleryItem.imageUrl) return;
    try {
      const res = await API.post('/gallery', newGalleryItem);
      if (res.data.success) {
        setGallery([res.data.data, ...gallery]);
        setNewGalleryItem({ title: '', category: 'Performances', imageUrl: '', caption: '', eventDate: '' });
      }
    } catch (err) {
      alert('Failed to add gallery item');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="bg-[#BE185D] text-white p-6 rounded-2xl border-2 border-[#FACC15] shadow-xl flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <span className="text-xs text-[#FEF08A] uppercase font-bold tracking-widest block">
              ACADEMY ADMINISTRATION PORTAL
            </span>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-white">
              Welcome, {user?.name || 'Guru Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllAdminData}
              className="px-4 py-2 bg-[#831843] text-[#FEF08A] rounded-lg text-xs font-bold border border-[#FACC15] hover:bg-[#BE185D] transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh Data
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-800 text-white rounded-lg text-xs font-bold hover:bg-red-900 transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#FACC15]/30 pb-3">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'applications', label: `Student Applications (${applications.length})`, icon: Users },
            { id: 'performances', label: `Performance Requests (${performanceRequests.length})`, icon: Music },
            { id: 'courses', label: `Courses & Slots (${courses.length})`, icon: BookOpen },
            { id: 'moderation', label: 'Reviews & Gallery', icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  activeTab === tab.id
                    ? 'bg-[#BE185D] text-[#FEF08A] border-[#FACC15] shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#FACC15]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-[#BE185D] border-t-[#FACC15] rounded-full animate-spin mx-auto mb-4" />
            <p className="font-cinzel text-base text-[#BE185D]">Syncing Academy Management Engine...</p>
          </div>
        ) : (
          <>
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
                {/* KPI Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#FACC15]/40 shadow-md space-y-2">
                    <span className="text-xs text-gray-500 font-bold uppercase">Total Applications</span>
                    <div className="font-cinzel text-3xl font-extrabold text-[#BE185D]">
                      {stats?.totalApplications || 0}
                    </div>
                    <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
                      {stats?.pendingApplications || 0} Pending Approvals
                    </span>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#FACC15]/40 shadow-md space-y-2">
                    <span className="text-xs text-gray-500 font-bold uppercase">Performance Inquiries</span>
                    <div className="font-cinzel text-3xl font-extrabold text-[#BE185D]">
                      {stats?.totalPerformanceRequests || 0}
                    </div>
                    <span className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">
                      {stats?.pendingPerformanceRequests || 0} Inquiries Pending
                    </span>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#FACC15]/40 shadow-md space-y-2">
                    <span className="text-xs text-gray-500 font-bold uppercase">Active Courses</span>
                    <div className="font-cinzel text-3xl font-extrabold text-[#BE185D]">
                      {stats?.totalCourses || 0}
                    </div>
                    <span className="text-xs text-gray-600">Classical Dancing Curriculum</span>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#FACC15]/40 shadow-md space-y-2">
                    <span className="text-xs text-gray-500 font-bold uppercase">Testimonials</span>
                    <div className="font-cinzel text-3xl font-extrabold text-[#BE185D]">
                      {stats?.totalReviews || 0}
                    </div>
                    <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded font-bold">
                      Public Reviews Moderated
                    </span>
                  </div>
                </div>

                {/* Recent Activity Table */}
                <div className="bg-white p-6 rounded-2xl border border-[#FACC15]/40 shadow-md space-y-4">
                  <h3 className="font-cinzel text-lg font-bold text-[#BE185D]">
                    Recent Student Admissions
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-gray-700">
                      <thead className="bg-[#FFF1F2] uppercase text-[#BE185D] border-b">
                        <tr>
                          <th className="p-3">Student Name</th>
                          <th className="p-3">Course</th>
                          <th className="p-3">Batch Timing</th>
                          <th className="p-3">Contact Phone</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {applications.slice(0, 5).map((app) => (
                          <tr key={app._id} className="hover:bg-gray-50">
                            <td className="p-3 font-bold text-gray-900">{app.studentName}</td>
                            <td className="p-3">{app.course?.title || 'Course'}</td>
                            <td className="p-3">{app.slot?.days} ({app.slot?.startTime})</td>
                            <td className="p-3">{app.phone}</td>
                            <td className="p-3">
                              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                                app.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {app.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 2. STUDENT APPLICATIONS TAB */}
            {activeTab === 'applications' && (
              <div className="bg-white p-6 rounded-2xl border border-[#FACC15]/40 shadow-md space-y-6 animate-fadeIn">
                <h3 className="font-cinzel text-xl font-bold text-[#BE185D]">
                  Manage Student Course Applications & Slot Reservations
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-700">
                    <thead className="bg-[#BE185D] text-[#FEF08A] uppercase">
                      <tr>
                        <th className="p-3">Applicant Name</th>
                        <th className="p-3">Contact Email & Phone</th>
                        <th className="p-3">Course Title</th>
                        <th className="p-3">Batch Slot</th>
                        <th className="p-3">Age / Exp</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {applications.map((app) => (
                        <tr key={app._id} className="hover:bg-gray-50">
                          <td className="p-3 font-bold text-gray-900">{app.studentName}</td>
                          <td className="p-3">
                            <div className="font-semibold">{app.email}</div>
                            <div className="text-gray-500">{app.phone}</div>
                          </td>
                          <td className="p-3 font-medium text-[#BE185D]">{app.course?.title}</td>
                          <td className="p-3">
                            {app.slot ? `${app.slot.days} (${app.slot.startTime})` : 'Slot Assigned'}
                          </td>
                          <td className="p-3">{app.age} yrs • {app.experienceYears} yrs exp</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                              app.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : app.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            {app.status !== 'approved' && (
                              <button
                                onClick={() => handleUpdateAppStatus(app._id, 'approved')}
                                className="px-2.5 py-1 bg-green-700 text-white rounded text-[11px] font-bold hover:bg-green-800"
                              >
                                Approve
                              </button>
                            )}
                            {app.status !== 'rejected' && (
                              <button
                                onClick={() => handleUpdateAppStatus(app._id, 'rejected')}
                                className="px-2.5 py-1 bg-red-700 text-white rounded text-[11px] font-bold hover:bg-red-800"
                              >
                                Reject
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. PERFORMANCE REQUESTS TAB */}
            {activeTab === 'performances' && (
              <div className="bg-white p-6 rounded-2xl border border-[#FACC15]/40 shadow-md space-y-6 animate-fadeIn">
                <h3 className="font-cinzel text-xl font-bold text-[#BE185D]">
                  Manage Stage Show Performance Inquiries
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-700">
                    <thead className="bg-[#831843] text-[#FEF08A] uppercase">
                      <tr>
                        <th className="p-3">Organizer / Event</th>
                        <th className="p-3">Date & Venue</th>
                        <th className="p-3">Troupe Format</th>
                        <th className="p-3">Budget</th>
                        <th className="p-3">Contact Info</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {performanceRequests.map((req) => (
                        <tr key={req._id} className="hover:bg-gray-50">
                          <td className="p-3">
                            <strong className="text-gray-900 block">{req.organizerName}</strong>
                            <span className="text-xs text-gray-500">{req.organization} • {req.eventType}</span>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-[#BE185D]">{new Date(req.eventDate).toDateString()}</div>
                            <div className="text-gray-500">{req.venue}, {req.city}</div>
                          </td>
                          <td className="p-3 font-medium">{req.troupeSize}</td>
                          <td className="p-3 font-bold text-green-700">{req.estimatedBudget}</td>
                          <td className="p-3">
                            <div>{req.email}</div>
                            <div className="text-gray-500">{req.phone}</div>
                          </td>
                          <td className="p-3">
                            <select
                              value={req.status}
                              onChange={(e) => handleUpdatePerfStatus(req._id, e.target.value)}
                              className="px-2 py-1 rounded border border-gray-300 text-xs bg-white font-bold"
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="declined">Declined</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. COURSES & SLOTS TAB */}
            {activeTab === 'courses' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-[#FACC15]/40 shadow-sm">
                  <h3 className="font-cinzel text-xl font-bold text-[#BE185D]">
                    Classical Dancing Curriculum Courses
                  </h3>
                  <button
                    onClick={() => setIsAddCourseModalOpen(true)}
                    className="px-4 py-2.5 bg-[#BE185D] text-[#FEF08A] font-bold text-xs rounded-xl border border-[#FACC15] hover:bg-[#831843] flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Create New Course
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course) => (
                    <div key={course._id} className="bg-white p-6 rounded-2xl border border-[#FACC15]/40 shadow-md space-y-4 relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-bold text-[#BE185D] uppercase tracking-wider">{course.category}</span>
                          <h4 className="font-cinzel text-lg font-bold text-gray-900">{course.title}</h4>
                        </div>
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-xs text-gray-600 line-clamp-2">{course.description}</p>
                      
                      <div className="flex justify-between items-center text-xs font-bold bg-[#FFF1F2] p-3 rounded-lg">
                        <span>Duration: {course.durationMonths} Months</span>
                        <span className="text-[#BE185D]">₹{course.feeMonthly} / mo</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. REVIEWS & GALLERY MODERATION TAB */}
            {activeTab === 'moderation' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
                
                {/* Reviews Moderation */}
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#FACC15]/40 shadow-md space-y-6">
                  <h3 className="font-cinzel text-xl font-bold text-[#BE185D]">
                    Public Testimonials Moderation
                  </h3>
                  <div className="space-y-4">
                    {reviews.map((rev) => (
                      <div key={rev._id} className="p-4 rounded-xl border border-gray-200 bg-[#FFF1F2] space-y-2">
                        <div className="flex justify-between items-center">
                          <strong className="font-cinzel text-sm text-[#831843]">{rev.name} ({rev.role})</strong>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleReviewApprove(rev._id)}
                              className={`px-2.5 py-0.5 text-[10px] font-bold rounded uppercase ${
                                rev.isApproved ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {rev.isApproved ? 'Approved' : 'Approve Review'}
                            </button>
                            <button onClick={() => handleDeleteReview(rev._id)} className="text-red-600 hover:text-red-800">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-700 italic">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Gallery Item */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#FACC15]/40 shadow-md space-y-4">
                  <h3 className="font-cinzel text-xl font-bold text-[#BE185D]">
                    Add Showcase Gallery Item
                  </h3>
                  <form onSubmit={handleCreateGalleryItem} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Image Title *</label>
                      <input
                        type="text"
                        required
                        value={newGalleryItem.title}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                        placeholder="e.g. Navarasa Performance Recital"
                        className="w-full px-3 py-2 border rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Category *</label>
                      <select
                        value={newGalleryItem.category}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                      >
                        <option value="Performances">Performances</option>
                        <option value="Arangetram">Arangetram</option>
                        <option value="Workshops">Workshops</option>
                        <option value="Academy Life">Academy Life</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Image URL *</label>
                      <input
                        type="url"
                        required
                        value={newGalleryItem.imageUrl}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 border rounded-lg text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#BE185D] text-[#FEF08A] font-bold text-xs rounded-lg border border-[#FACC15]"
                    >
                      Publish Gallery Item
                    </button>
                  </form>
                </div>

              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
