// Automatically generated by GDevelop.js/scripts/generate-types.js
declare class gdEventsBasedObjectVariant {
  constructor(): void;
  getName(): string;
  setName(name: string): gdEventsBasedObjectVariant;
  getInitialInstances(): gdInitialInstancesContainer;
  getLayers(): gdLayersContainer;
  getObjects(): gdObjectsContainer;
  getAreaMinX(): number;
  getAreaMinY(): number;
  getAreaMinZ(): number;
  getAreaMaxX(): number;
  getAreaMaxY(): number;
  getAreaMaxZ(): number;
  setAreaMinX(value: number): void;
  setAreaMinY(value: number): void;
  setAreaMinZ(value: number): void;
  setAreaMaxX(value: number): void;
  setAreaMaxY(value: number): void;
  setAreaMaxZ(value: number): void;
  serializeTo(element: gdSerializerElement): void;
  unserializeFrom(project: gdProject, element: gdSerializerElement): void;
  delete(): void;
  ptr: number;
};