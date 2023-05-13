import { findInReactTree } from "decky-frontend-lib"
import { VFC } from "react"
import { reactTree } from "../init"


interface BrowserContainerProps {
    browser: any
    className?: string
    visible?: boolean
    hideForModals?: boolean
    external?: boolean
    displayURLBar?: boolean
    autoFocus?: boolean
}

export const BrowserContainer = findInReactTree(reactTree, node => {
    return node?.type?.toString().includes('n.Z5.GamepadUI.SteamWeb()')
}).child.child.child.child.type as VFC<BrowserContainerProps>

