
export interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}
