export function Button (
    props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) {
    const defaults = {
        children: '<button>',
        onClick: () => console.log( 'onClick ==', props.onClick ),
    }
    return <button
        {...props}
        onClick={props.onClick ?? defaults.onClick}
    >
        {props.children ?? defaults.children}
    </button>
}