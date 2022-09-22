import cssModule from './SearchBar.module.scss'
import Link from 'next/link'
import { startCase } from 'lodash'
import { FC, useState } from 'react'
import { COLORS } from '../constants/COLORS'
import { SIZES } from '../constants/SIZES'
import { joinTruthyValues } from '../lib/joinTruthyValues'
import { useNewFeatureHighlight } from '../lib/useNewFeatureHighlight'
import { useSearch } from '../lib/useSearch'
import { cars } from '../sampleData/cars'

export const SearchBar: FC<{}> = () => {
    const { search, searchSet, results } = useSearch(
        cars,
        // '1FTNE14W18DB27128',
        // '1C4NJDBB3HD133672',
        // '56206002',
        // '1658498136',
    )

    const [ focused, focusedSet ] = useState( false )
    const searchFeatureHighlight = useNewFeatureHighlight( 'search' )

    const focus = () => {
        focusedSet( true )
        searchFeatureHighlight.hide()
    }
    const blur = () => focusedSet( false )

    return <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
    }}>
        <input className={joinTruthyValues( [
            'darken',
            searchFeatureHighlight.shown && 'rainbow',
        ] )} type='text'
            placeholder={searchFeatureHighlight.shown ? 'Search (Try Me!)' : 'Search'}
            onFocus={focus}
            value={search}
            onChange={e => searchSet( e.target.value )}
            style={{
                padding: 10,
                width: '100%',
                height: '100%',
                border: 'none',
                fontSize: 16,
            }}
        />

        <div className={cssModule.searchResultArea} style={{
            visibility: focused ? 'visible' : 'hidden',
            top: SIZES.appBar.height,
        }}>
            <div
                onClick={blur}
                className='OutsideOfSearchResults' style={{
                    display: focused ? 'block' : 'none',
                    height: '100vh',
                    width: '100vw',
                    position: 'fixed',
                    top: SIZES.appBar.height,
                    left: 0,
                }}>
            </div>

            <div className={cssModule.searchResults} style={{
                backgroundColor: COLORS.bgColorSecondary,
                zIndex: 10,
            }}>
                {results.map( ( { year, make, model, trim, color, vin, lotNumber, status } ) =>
                    <Link href={`/car-details?vin=${ vin }`} >
                        <a key={vin} onClick={blur}>
                            <div>
                                <span>{
                                    joinTruthyValues( [
                                        year, make, model, trim, color
                                    ].map( x => x?.toString().toUpperCase() ) )
                                }</span>
                                <span>{startCase( status )}</span>
                            </div>

                            <div>
                                <small>{joinTruthyValues( [
                                    vin, lotNumber
                                ], 3 )}</small>
                            </div>
                        </a>
                    </Link>
                )}
            </div>

        </div>

    </div>
}