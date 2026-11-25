import backgroundShadow from "../assets/Background+Shadow.svg";

type Props = {}

export default function Header({ }: Props) {
    return (
        <header className="flex w-1/2 mx-auto  bg-white gap-1 py-3">
            <img src={backgroundShadow} className="w-8 h-8" alt="logo" />
            <h1 className="font-semibold text-[18px]">TaskFlow</h1>
        </header>

    )
}