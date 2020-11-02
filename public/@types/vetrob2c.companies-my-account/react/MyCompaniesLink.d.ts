/// <reference types="react" />
interface RenderProps {
    name: string;
    path: string;
}
interface Props {
    render: (paths: RenderProps[]) => any;
    intl: any;
}
declare const _default: import("react").ForwardRefExoticComponent<Pick<Props, "render"> & {
    forwardedRef?: ((instance: any) => void) | import("react").RefObject<any> | null | undefined;
} & import("react").RefAttributes<any>> & {
    WrappedComponent: import("react").ComponentType<Props>;
};
export default _default;
