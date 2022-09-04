declare module "*.module.css";
declare module "*.svg" {
    export const ReactComponent: JSX.IntrinsicElements.svg;
    const src: string; // React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default src;
}
