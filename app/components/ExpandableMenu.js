import { Button, Menu, HtmlElement, Submenu, Icon, ContentResolver, PureContainer } from 'cx/widgets';
import { bind, expr } from 'cx/ui';

class MorphicMenu extends Menu {
    add(element) {
        if (element && element.$type == Button) {
            super.add({ ...element, $type: HtmlElement, tag: "a" });
        } else {
            super.add(...arguments);
        }
    }
}
// TODO: uncomment ...rest once it is supported by Cx
export const ExpandableMenu = ({ expand, children, icon="dehaze" /*, ...rest*/ }) => (
  <cx>
    <ContentResolver
        params={expand}
        onResolve={expand => {
            if (expand) return <cx><Menu horizontal mod="expanded-menu" /*{...rest}*/>{children}</Menu></cx>;
            return <cx>
                <Menu horizontal /*{, ...rest}*/>
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
);