"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useState } from "react";
import SortableItem from "./SortableItem";
import Item from "./Item";

export interface Users {
  id: number;
  name: string;
  description: string;
}

const mockUsers: Users[] = [
  {
    id: 1,
    name: "Sameer Joshi",
    description: "Software Developer",
  },
  {
    id: 2,
    name: "Rohan Mainali",
    description: "Software Developer",
  },
  {
    id: 3,
    name: "Roshan Smith",
    description: "Software Developer",
  },
  {
    id: 4,
    name: "Jane Smith",
    description: "Software Developer",
  },
  {
    id: 5,
    name: "Leanne Graham",
    description: "Multi-layered client-server neural-net",
  },
  {
    id: 6,
    name: "Ervin Howell",
    description: "Configurable multimedia task-force",
  },
  {
    id: 7,
    name: "Clementine Bauch",
    description: "Centralized empowering task-force",
  },
  {
    id: 8,
    name: "Patricia Lebsack",
    description: "Object-based bandwidth-monitored database",
  },
];

const Sortable = () => {
  const [users, setUsers] = useState<Users[]>(mockUsers);
  const [activeUser, setActiveUser] = useState<Users>();

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveUser(users.find((user) => user.id === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeItem = users.find((user) => user.id === active.id);
    const overItem = users.find((user) => user.id === over.id);

    if (!activeItem || !overItem) {
      return;
    }

    const activeIndex = users.findIndex((user) => user.id === active.id);
    const overIndex = users.findIndex((user) => user.id === over.id);

    if (activeIndex !== overIndex) {
      setUsers((prev) => arrayMove<Users>(prev, activeIndex, overIndex));
    }
    setActiveUser(undefined);
  };

  const handleDragCancel = () => {
    setActiveUser(undefined);
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={users} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-5 gap-4 max-w-[800px] p-4 bg-slate-700">
          {users.map((user) => (
            <SortableItem key={user.id} item={user} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
        {activeUser ? <Item item={activeUser} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Sortable;
