import React from 'react';
import { Clock, Calendar, Users, CheckCircle } from 'lucide-react';

const SlotPicker = ({ slots, selectedSlotId, onSelectSlot }) => {
  if (!slots || slots.length === 0) {
    return (
      <div className="p-4 bg-[#FFF1F2] border border-[#FACC15]/40 rounded-xl text-center text-xs text-gray-500">
        No active slots currently open for this course. Please contact administration.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-[#831843] uppercase tracking-wider">
        Select Preferred Class Timing / Batch Slot *
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {slots.map((slot) => {
          const seatsLeft = slot.maxCapacity - slot.bookedCount;
          const isFull = seatsLeft <= 0;
          const isSelected = selectedSlotId === slot._id;

          return (
            <div
              key={slot._id}
              onClick={() => !isFull && onSelectSlot(slot._id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-[#BE185D] border-[#FEF08A] text-white shadow-lg ring-2 ring-[#FEF08A]'
                  : isFull
                  ? 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                  : 'bg-white border-[#FACC15]/40 text-gray-800 hover:border-[#FACC15] hover:shadow-md'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 text-[#FEF08A]">
                  <CheckCircle className="w-5 h-5" />
                </div>
              )}

              <div className="space-y-1.5">
                <span
                  className={`text-xs font-bold block ${
                    isSelected ? 'text-[#FEF08A]' : 'text-[#BE185D]'
                  }`}
                >
                  {slot.batchName || 'Standard Batch'}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <Calendar className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FEF08A]' : 'text-[#FACC15]'}`} />
                  <span>{slot.days}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FEF08A]' : 'text-[#FACC15]'}`} />
                  <span>{slot.startTime} - {slot.endTime}</span>
                </div>

                <div className="pt-2 flex justify-between items-center text-[11px] border-t border-current/10">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Cap: {slot.maxCapacity} students
                  </span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      isFull
                        ? 'bg-red-100 text-red-700'
                        : seatsLeft <= 3
                        ? 'bg-amber-100 text-amber-800 font-extrabold'
                        : isSelected
                        ? 'bg-[#FEF08A] text-[#831843]'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {isFull ? 'Batch Full' : `${seatsLeft} seats left`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SlotPicker;
