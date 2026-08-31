import { create } from 'zustand';

export type ViewMode = '3d' | 'floor-plan' | 'photos';

interface ViewerState {
  selectedPropertyId: string | null;
  selectedRoomId: string | null;
  selectedFloor: number;
  currentView: ViewMode;
  setSelectedProperty: (propertyId: string | null, floor?: number) => void;
  setSelectedRoom: (roomId: string | null) => void;
  setSelectedFloor: (floor: number) => void;
  setCurrentView: (view: ViewMode) => void;
  resetViewer: () => void;
}

const initialState = {
  selectedPropertyId: null,
  selectedRoomId: null,
  selectedFloor: 1,
  currentView: '3d' as ViewMode,
};

export const useViewerStore = create<ViewerState>((set) => ({
  ...initialState,
  setSelectedProperty: (propertyId, floor = 1) =>
    set({ selectedPropertyId: propertyId, selectedFloor: floor, selectedRoomId: null }),
  setSelectedRoom: (roomId) => set({ selectedRoomId: roomId }),
  setSelectedFloor: (floor) => set({ selectedFloor: floor }),
  setCurrentView: (view) => set({ currentView: view }),
  resetViewer: () => set(initialState),
}));
