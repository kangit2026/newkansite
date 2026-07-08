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
import { useRouter } from 'next/router'
import { css, styled } from 'stitches.config'
import { Filters } from './Filters'
import MapIcon from '@assets/projects/map.svg?svgr'
import ListIcon from '@assets/projects/list.svg?svgr'
import StackIcon from '@assets/projects/stack.svg?svgr'
import { ProjectCard } from '@components/common/ProjectCard'
import { Col, Grid } from '@ui'
import { Project } from '@utils/api/project'
import { ProjectCategory, projectsCount } from '@utils/api/projects'
import { ScrollAnchor } from '@components/common/ScrollAnchor'
import { useTheme } from 'next-themes'
import { scrollToElement } from '@utils/helpers/animations'

const buildProjectsHref = (
  page: number,
  categoryId: number | null
): string => {
  const params = new URLSearchParams()

  if (categoryId) params.set('category', String(categoryId))
  if (page > 0) params.set('page', String(page + 1))

  const qs = params.toString()

  return `/projects${qs ? `?${qs}` : ''}`
}

export type ProjectsListProps = HTMLAttributes<HTMLDivElement> & {
  projects: { data: Project[]; total: number }
  page?: number
  categoryId?: number | null
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
  projects: { data: projects = [], total = 0 } = { data: [], total: 0 },
  categories,
  page: currentPage = 0,
  categoryId = null,
  ...props
}) => {
  const [selectedType, setSelectedType] = useState(
    ProjectItemTypes.Stack
  )

  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const filtersRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url.split('?')[0] === router.pathname) setIsNavigating(true)
    }
    const handleDone = () => setIsNavigating(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleDone)
    router.events.on('routeChangeError', handleDone)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleDone)
      router.events.off('routeChangeError', handleDone)
    }
  }, [router])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    scrollToElement(filtersRef.current)
  }, [currentPage, categoryId])

  const pagesCount = Math.ceil(total / projectsCount)

  return (
    <Wrapper {...props}>
      <div className="p-relative">
        <ScrollAnchor ref={filtersRef} />
        <Filters
          amount={total}
          itemTypes={itemTypes}
          categories={categories}
          selectedType={selectedType}
          selectedProjectType={categoryId}
          onItemTypeChange={setSelectedType}
          onProjectTypeChange={(t: number) => {
            router.push(buildProjectsHref(0, t))
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
              isLoading={isNavigating}
              getHref={(page: number) =>
                buildProjectsHref(page, categoryId)
              }
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
