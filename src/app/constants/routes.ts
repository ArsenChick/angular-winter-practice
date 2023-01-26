export const RouteParams = {
  diagram: {
    id: "id"
  }
}

export const AppRoutes = {
  home: 'home',
  diagram: `diagram/:${RouteParams.diagram.id}`,
}
