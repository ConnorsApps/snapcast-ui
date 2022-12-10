import { useContext } from 'react';
import Group from '../../components/Group/Group';
import { AppContext } from '../../utils/AppContext';
import './Groups.scss';

const Groups = () => {
    const { groups } = useContext(AppContext);

    const groupList = Object.values(groups ?? {});

    return (
        <div className='groups'>
            {groupList.map((group, i) =>
                <Group
                    key={i}
                    group={group}
                />
            )}
        </div>
    )
}

export default Groups;