import { Button, Menu, HtmlElement, Submenu, Icon, ContentResolver } from 'cx/widgets';
import { bind, expr, createFunctionalComponent } from 'cx/ui';

class MorphicMenu extends Menu {
    add(element) {
        if (element && element.$type == Button) {
            super.add({ ...element, $type: HtmlElement, tag: "a" });
        } else {
            super.add(...arguments);
        }
    }
}

export const ExpandableMenu = createFunctionalComponent(({ expand, children, icon="menu", ...props }) => (
  <cx>
    <ContentResolver
        params={expand}
        onResolve={expand => {
            if (expand) return <cx><Menu horizontal mod="expanded-menu" {...props}>{children}</Menu></cx>;
            return <cx>
                <Menu horizontal {...props}>
                    <Submenu>
                        <a><Icon name={icon}/></a>
                        <MorphicMenu putInto="dropdown">
                            {children}
                        </MorphicMenu>
                    </Submenu>
                </Menu>
            </cx>;
        }}
    />
  </cx>
));