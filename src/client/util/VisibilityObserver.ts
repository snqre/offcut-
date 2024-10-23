import * as Web from "@web";

export type VisibilityObserverListener = () => void;
export type VisibilityObserverRef = IntersectionObserver | null;
export type VisibilityObserverCallback<T> = (element: T | null) => void;
export type VisibilityObserverPayload = {
    onVisible?: VisibilityObserverListener;
    onHidden?: VisibilityObserverListener;
}
export function useVisibilityObserver<T extends HTMLElement>({onVisible, onHidden}: VisibilityObserverPayload): VisibilityObserverCallback<T> {
    const observer: Web.React.MutableRefObject<VisibilityObserverRef> = Web.React.useRef<IntersectionObserver | null>(null);
    return Web.React.useCallback<VisibilityObserverCallback<T>>(element => {
        observer.current?.disconnect();
        observer.current = new IntersectionObserver(entries => entries[0]?.isIntersecting ? onVisible && onVisible() : onHidden && onHidden());
        element && observer.current.observe(element);
        return;
    }, [onVisible, onHidden]);
}