import { Pagination } from '@components/common/Pagination'
import { Table } from '@components/common/Table'
import Map from '@components/common/Map'
import React, {
  FC,
  HTMLAttributes,
  useEffect,
  useRef,
  useState
} from 'react'
import { css, styled } from 'stitches.config'
import { Filters } from './Filters'
import MapIcon from '@assets/projects/map.svg?svgr'
import ListIcon from '@assets/projects/list.svg?svgr'
import StackIcon from '@assets/projects/stack.svg?svgr'
import { ProjectCard } from '@components/common/ProjectCard'
import { Col, Grid } from '@ui'
import { Project } from '@utils/api/project'
import {
  getProjects,
  ProjectCategory,
  projectsCount
} from '@utils/api/projects'
import { useQuery } from 'react-query'
import { ScrollAnchor } from '@components/common/ScrollAnchor'
import { useTheme } from 'next-themes'
import { scrollToElement } from '@utils/helpers/animations'

export type ProjectsListProps = HTMLAttributes<HTMLDivElement> & {
  projects: { data: Project[]; total: number }
  categories: ProjectCategory[]
}

export enum ProjectItemTypes {
  Stack,
  List,
  Map
}

export type FilterItemType = { type: ProjectItemTypes; icon: FC }

const itemTypes: FilterItemType[] = [
  {
    type: ProjectItemTypes.Stack,
    icon: StackIcon
  },
  {
    type: ProjectItemTypes.List,
    icon: ListIcon
  },
  {
    type: ProjectItemTypes.Map,
    icon: MapIcon
  }
]

export type ContentProps = {
  type: ProjectItemTypes
  projects: Project[]
}

const coords = {
  lat: 50.44201833564562,
  lng: 30.511523420144183
}

const Content: FC<ContentProps> = ({ projects, type }) => {
  const { resolvedTheme } = useTheme()

  return (
    <>
      <ContentWrapper visible={type == ProjectItemTypes.Map}>
        <Map
          {...coords}
          visible={type == ProjectItemTypes.Map}
          className={map()}
          zoom={11}
          theme={resolvedTheme}
        ></Map>
      </ContentWrapper>

      <ContentWrapper visible={type == ProjectItemTypes.List}>
        <Table
          items={projects.map(
            ({ id, link, title, category, address }) => ({
              id,
              link,
              title,
              category,
              address
            })
          )}
          className={table()}
          options={{
            title: { style: 'title' },
            category: { style: 'default', optional: true },
            address: { style: 'description', optional: true }
          }}
          loading={false}
        />
      </ContentWrapper>

      <ContentWrapper visible={type == ProjectItemTypes.Stack}>
        <StacksWrapper>
          {projects.map(
            ({ id, title, image, phone, features, link }) => (
              <ProjectCard
                slideable={false}
                onLeft={() => {}}
                onRight={() => {}}
                key={id}
                image={image}
                title={title}
                phone={phone}
                features={features}
                link={link}
                type="small"
                projectId={id}
              />
            )
          )}
        </StacksWrapper>
      </ContentWrapper>
    </>
  )
}

export const ProjectsList: FC<ProjectsListProps> = ({
  projects: initialData = { data: [], total: 0 },
  categories,
  ...props
}) => {
  const [selectedType, setSelectedType] = useState(
    ProjectItemTypes.Stack
  )

  const [selectedProjectType, setSelectedProjectType] =
    useState<number>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [canFetch, setCanFetch] = useState(false)
  const filtersRef = useRef(null)

  useEffect(() => {
    // hack to prevent query when the component is mounted
    if (currentPage > 0) {
      setCanFetch(true)
    }
  }, [currentPage])

  useEffect(() => {
    // the same as previous, but checking project categories filter
    if (selectedProjectType != null) {
      setCanFetch(true)
    }
  }, [selectedProjectType])

  const { isFetching, data } = useQuery<{
    data: Project[]
    total: number
  }>(
    ['projects', currentPage, canFetch, selectedProjectType],
    () =>
      getProjects({
        count: projectsCount,
        start: currentPage * projectsCount,
        categoryId: selectedProjectType
          ? categories.find(({ id }) => id == selectedProjectType).id
          : null
      }),
    {
      enabled: canFetch,
      initialData,
      onSuccess() {
        scrollToElement(filtersRef.current)
      },
      cacheTime: 0
    }
  )

  const { data: projects = [], total = 0 } = data
  const pagesCount = Math.ceil(total / projectsCount)

  return (
    <Wrapper {...props}>
      <div className="p-relative">
        <ScrollAnchor ref={filtersRef} />
        <Filters
          amount={data.total}
          itemTypes={itemTypes}
          categories={categories}
          selectedType={selectedType}
          selectedProjectType={selectedProjectType}
          onItemTypeChange={setSelectedType}
          onProjectTypeChange={(t) => {
            setCurrentPage(0)
            setSelectedProjectType(t)
          }}
        />
      </div>

      <Grid className={undefined} >
        <Col className={undefined}  xs={{ span: 10, start: 2 }}>
          <Content projects={projects} type={selectedType} />

          {(selectedType == ProjectItemTypes.List ||
            selectedType == ProjectItemTypes.Stack) && (
            <Pagination
              className={pagination()}
              pagesCount={pagesCount}
              currentPage={currentPage}
              isLoading={isFetching}
              setPage={(page: number) => setCurrentPage(page)}
            />
          )}
        </Col>
      </Grid>
    </Wrapper>
  )
}

const Wrapper = styled('div', {})

const StacksWrapper = styled('div', {
  display: 'grid',
  mt: 40,
  gridTemplateColumns: '1fr',
  gap: 60,

  '@lg': {
    gridTemplateColumns: 'repeat(2, 1fr)'
  }
})

const ContentWrapper = styled('div', {
  variants: {
    visible: {
      false: {
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden'
      }
    }
  }
})

const pagination = css({
  mt: 24
})

const table = css({
  mt: 24
})

const map = css({
  mt: 50,
  br: 8,
  overflow: 'hidden'
})
