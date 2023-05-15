import {
    definePlugin,
    Router,
    ServerAPI,
    staticClasses,
    getGamepadNavigationTrees,
    getFocusNavController,
} from "decky-frontend-lib";
import { lle, llog } from "./log";
import { routePath, SP_Window } from "./init";
import { Content } from "./components/QAMContent";
import { FaShip } from "react-icons/fa";
import { appendStyles } from "./styling";
import { TabbedBrowser } from "./components/TabbedBrowser";
import { tabManager } from "./classes/TabManager";
import { patchMenu } from "./patchMenu";
import { moveMouse } from "./mouse";

/**
 * 
 * TODO also search needs to be patch after menu open as well
 */

export default definePlugin((serverApi: ServerAPI) => {
    appendStyles(SP_Window)
    // SteamClient.Input.RegisterForControllerAnalogInputMessages(moveMouse)

    serverApi.routerHook.addRoute(routePath, () => {
        return <TabbedBrowser tabManager={tabManager} />
    })

    const unpatchMenu = patchMenu()

    // const steamInputModule = findModuleChild((mod) => {
    //     for (let prop in mod) {
    //         if (mod[prop]?.OnControllerCommandMessage) {
    //             return mod
    //         }

    //     }
    // })

    // const a = findModuleChild((mod) => {
    //     for (let prop in mod) {
    //         if (mod[prop]?.UpdateStreamingInputPauseState) {
    //             return mod
    //         }

    //     }
    // })

    // const mainBNode = findInReactTree(reactTree, (x) => x?.props?.path == '/steamweb')

    //@ts-ignore
    window.test = {
        router: Router,
        navtrees: getGamepadNavigationTrees(),
        focusNavController: getFocusNavController(),
        tabManager: tabManager,
        // webroot: externalwebRoot,
        // si: steamInputModule,
        // appid: a,
        // bnode: mainBNode,
        // focus: FocusableInput,
        // searchElt: searchInputElt,
        // qlt: searchBarRootNode,
    }

    return {
        title: <div className={staticClasses.Title}>Web</div>,
        content: <Content />,
        icon: <FaShip />,
        onDismount() {
            serverApi.routerHook.removeRoute(routePath);
            unpatchMenu()
        },
    };
});


