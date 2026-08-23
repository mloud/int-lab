
import { Segment } from './types';

// RAKETA (10 částí) - Lehká - Pestré barvy
export const ROCKET_DATA: Segment[] = [
  { id: 0, path: "M 200,50 L 230,100 L 170,100 Z", targetRGB: { r: 255, g: 60, b: 60 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 200, y: 88 } },
  { id: 1, path: "M 170,100 L 230,100 L 230,180 L 170,180 Z", targetRGB: { r: 100, g: 200, b: 255 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 200, y: 140 } },
  { id: 2, path: "M 170,180 L 230,180 L 230,260 L 170,260 Z", targetRGB: { r: 255, g: 220, b: 100 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 200, y: 220 } },
  { id: 3, path: "M 170,200 L 130,260 L 170,260 Z", targetRGB: { r: 255, g: 120, b: 0 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 156, y: 245 } },
  { id: 4, path: "M 230,200 L 270,260 L 230,260 Z", targetRGB: { r: 180, g: 80, b: 255 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 244, y: 245 } },
  { id: 5, path: "M 185,130 A 15,15 0 1,1 215,130 A 15,15 0 1,1 185,130", targetRGB: { r: 0, g: 255, b: 200 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 200, y: 165 } },
  { id: 6, path: "M 180,260 L 220,260 L 210,300 L 190,300 Z", targetRGB: { r: 80, g: 80, b: 80 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 200, y: 280 } },
  { id: 7, path: "M 190,300 L 210,300 L 200,340 Z", targetRGB: { r: 255, g: 100, b: 0 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 200, y: 315 } },
  { id: 8, path: "M 100,340 L 150,320 L 130,360 Z", targetRGB: { r: 0, g: 150, b: 100 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 125, y: 340 } },
  { id: 9, path: "M 300,340 L 250,320 L 270,360 Z", targetRGB: { r: 200, g: 0, b: 150 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 275, y: 340 } },
];

// KOČKA (15 částí) - Střední - Pestré barvy
export const CAT_DATA: Segment[] = [
  { id: 0, path: "M 130,120 L 160,140 L 140,210 Z", targetRGB: { r: 255, g: 160, b: 120 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 145, y: 165 } },
  { id: 1, path: "M 270,120 L 240,140 L 260,210 Z", targetRGB: { r: 255, g: 160, b: 120 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 255, y: 165 } },
  { id: 2, path: "M 160,140 L 200,120 L 200,180 L 160,180 Z", targetRGB: { r: 255, g: 180, b: 0 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 182, y: 150 } },
  { id: 3, path: "M 200,120 L 240,140 L 240,180 L 200,180 Z", targetRGB: { r: 255, g: 140, b: 50 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 218, y: 150 } },
  { id: 4, path: "M 160,180 L 240,180 L 220,230 L 180,230 Z", targetRGB: { r: 255, g: 240, b: 200 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 200, y: 205 } },
  { id: 5, path: "M 180,230 L 200,230 L 200,270 L 160,270 Z", targetRGB: { r: 200, g: 150, b: 100 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 180, y: 250 } },
  { id: 6, path: "M 200,230 L 220,230 L 240,270 L 200,270 Z", targetRGB: { r: 180, g: 130, b: 80 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 220, y: 250 } },
  { id: 7, path: "M 190,270 L 210,270 L 200,285 Z", targetRGB: { r: 255, g: 100, b: 150 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 200, y: 278 } },
  { id: 8, path: "M 175,170 A 5,5 0 1,1 185,170 A 5,5 0 1,1 175,170", targetRGB: { r: 0, g: 200, b: 0 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 180, y: 182 } },
  { id: 9, path: "M 215,170 A 5,5 0 1,1 225,170 A 5,5 0 1,1 215,170", targetRGB: { r: 0, g: 200, b: 0 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 220, y: 182 } },
  { id: 10, path: "M 140,270 L 260,270 L 240,340 L 160,340 Z", targetRGB: { r: 255, g: 200, b: 50 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 200, y: 310 } },
  { id: 11, path: "M 160,340 L 200,340 L 190,380 L 150,380 Z", targetRGB: { r: 255, g: 255, b: 255 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 175, y: 360 } },
  { id: 12, path: "M 200,340 L 240,340 L 250,380 L 210,380 Z", targetRGB: { r: 255, g: 255, b: 255 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 225, y: 360 } },
  { id: 13, path: "M 260,280 Q 320,280 320,200", targetRGB: { r: 0, g: 0, b: 0 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 295, y: 245 } },
  { id: 14, path: "M 320,200 Q 330,170 350,180", targetRGB: { r: 255, g: 150, b: 200 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 335, y: 182 } },
];

// POČÍTAČ (20 částí) - Těžká - Pestré barvy
export const COMPUTER_DATA: Segment[] = [
  // Monitor bezel
  { id: 0, path: "M 100,80 L 300,80 L 300,100 L 100,100 Z", targetRGB: { r: 0, g: 120, b: 120 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 200, y: 90 } },
  { id: 1, path: "M 100,200 L 300,200 L 300,220 L 100,220 Z", targetRGB: { r: 0, g: 120, b: 120 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 200, y: 210 } },
  { id: 2, path: "M 100,100 L 120,100 L 120,200 L 100,200 Z", targetRGB: { r: 0, g: 90, b: 90 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 110, y: 150 } },
  { id: 3, path: "M 280,100 L 300,100 L 300,200 L 280,200 Z", targetRGB: { r: 0, g: 90, b: 90 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 290, y: 150 } },
  // Screen
  { id: 4, path: "M 120,100 L 210,100 L 210,150 L 120,150 Z", targetRGB: { r: 135, g: 206, b: 250 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 165, y: 125 } },
  { id: 5, path: "M 210,100 L 280,100 L 280,150 L 210,150 Z", targetRGB: { r: 65, g: 105, b: 225 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 245, y: 125 } },
  { id: 6, path: "M 120,150 L 210,150 L 210,200 L 120,200 Z", targetRGB: { r: 50, g: 205, b: 50 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 165, y: 175 } },
  { id: 7, path: "M 210,150 L 280,150 L 280,200 L 210,200 Z", targetRGB: { r: 255, g: 255, b: 0 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 245, y: 175 } },
  // Stand
  { id: 8, path: "M 180,220 L 220,220 L 210,250 L 190,250 Z", targetRGB: { r: 170, g: 170, b: 170 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 200, y: 235 } },
  { id: 9, path: "M 150,250 L 250,250 L 260,265 L 140,265 Z", targetRGB: { r: 100, g: 100, b: 100 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 200, y: 258 } },
  // Keyboard
  { id: 10, path: "M 120,300 L 200,300 L 200,330 L 110,330 Z", targetRGB: { r: 130, g: 0, b: 130 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 155, y: 315 } },
  { id: 11, path: "M 200,300 L 280,300 L 290,330 L 200,330 Z", targetRGB: { r: 130, g: 0, b: 130 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 245, y: 315 } },
  { id: 12, path: "M 110,330 L 200,330 L 200,360 L 100,360 Z", targetRGB: { r: 75, g: 0, b: 130 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 150, y: 345 } },
  { id: 13, path: "M 200,330 L 290,330 L 300,360 L 200,360 Z", targetRGB: { r: 75, g: 0, b: 130 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 250, y: 345 } },
  // Mouse
  { id: 14, path: "M 320,330 L 350,330 L 360,360 L 310,360 Z", targetRGB: { r: 255, g: 0, b: 0 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 335, y: 345 } },
  // Case
  { id: 15, path: "M 330,80 L 380,80 L 380,260 L 330,260 Z", targetRGB: { r: 0, g: 0, b: 128 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 355, y: 170 } },
  { id: 16, path: "M 340,100 L 370,100 L 370,110 L 340,110 Z", targetRGB: { r: 200, g: 200, b: 200 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 355, y: 105 } },
  { id: 17, path: "M 340,120 L 370,120 L 370,130 L 340,130 Z", targetRGB: { r: 245, g: 245, b: 220 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 355, y: 125 } },
  { id: 18, path: "M 350,230 A 5,5 0 1,1 360,230 A 5,5 0 1,1 350,230", targetRGB: { r: 60, g: 255, b: 20 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 355, y: 245 } },
  { id: 19, path: "M 310,220 Q 330,220 330,240", targetRGB: { r: 30, g: 30, b: 30 }, currentRGB: { r: 255, g: 255, b: 255 }, isCorrect: false, labelPosition: { x: 318, y: 232 } },
];
