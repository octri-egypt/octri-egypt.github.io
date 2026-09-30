declare module "vanta/dist/vanta.waves.min.js" {
  interface VantaEffect {
    destroy: () => void;
  }
  const WAVES: (opts: Record<string, unknown>) => VantaEffect;
  export default WAVES;
}
