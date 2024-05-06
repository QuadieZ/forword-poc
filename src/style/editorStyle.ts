export const editorStyle = {
    '.ProseMirror': {
        height: '100%',
    },
    '.ProseMirror-focused': {
        outline: 'none'
    },
    '.collaboration-cursor__caret': {
        borderLeft: "1px solid #0d0d0d",
        borderRight: "1px solid #0d0d0d",
        marginLeft: "-1px",
        marginRight: "-1px",
        pointerEvents: "none",
        position: "relative",
        wordBreak: "normal"
    },
    '.collaboration-cursor__label': {
        fontStyle: "normal",
        fontWeight: 600,
        left: "-1px",
        lineHeight: "normal",
        position: "absolute",
        userSelect: "none",
        whiteSpace: "nowrap",
        fontSize: "14px",
        color: "#fff",
        top: "-1.4em",
        borderRadius: "6px",
        borderBottomLeftRadius: "0",
        padding: "2px 6px",
        pointerEvents: "none"
    },
    'code': {
        background: 'gray.300',
        borderRadius: '4px',
        padding: '3px 6px',
        fontSize: '85%'
    },
    'p': {
        fontWeight: '300',
    }
}
