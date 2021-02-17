import {useRouter} from 'next/router'
import {Container, Pagination} from 'semantic-ui-react'

function EmployeePagination({totalPages}) {
    const router = useRouter()

    return (
        <Container textAlign="center" style={{margin:'2em'}}>
            <Pagination
                defaultActivePage={1}
                totalPages={totalPages}
                onPageChange={(event, data) => {
                    data.activePage === 1
                    ? router.push('/employees')
                    : router.push(`/employees?page=${data.activePage}`)
                }}
            />
        </Container>
    )
}

export default EmployeePagination