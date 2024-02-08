export interface ModalContainerProps {
    selectedEntry: Track | Artist;
    modalCloseHandler: any
}


export interface ModalProps {
    track: Track;
    artists?: Artist[];
    preview_url: string;
    image: string;
    recommendations: Track[];
    closeHandler: any;
}