import React from 'react'
import withClickOutside from '../../helpers/withClickOutside'
import ChirpDropdown from './ChirpDropdown'
import styles from './styles.module.css'

const ChirpOption = React.forwardRef(({ open, setOpen, owner, onDelete }, ref) => {
    const openOptions = () => setOpen(true)
    return (
        <section className={styles.chirp__options}>
            <section ref={ref}>
                <button onClick={openOptions}>···</button>
                {open && <ChirpDropdown owner={owner} onDelete={onDelete} />}
            </section>
        </section>
    )
})

export default withClickOutside(ChirpOption)