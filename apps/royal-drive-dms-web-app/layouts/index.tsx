import { AnyObj } from '@weis-guys/ts-utils'
import { FC } from 'react'

export type PageProps = {
    pageTitle?: string
}

export type PageComponent<Props extends AnyObj = AnyObj> = FC<PageProps & Props>

export type LayoutComponent = <Props extends AnyObj = AnyObj> (
    component: PageComponent<Props>
) => PageComponent<Props>

export const BasicLayout: LayoutComponent = component => {
    return props => <div className='BasicLayout'>
        <h1>BasicLayout</h1>
        {component( props )}
    </div>
}