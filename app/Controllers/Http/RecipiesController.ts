import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Recipy from 'App/Models/Recipy'

export default class RecipiesController {
  public async index ({}: HttpContextContract) {
    const recipies = await Recipy.query()
    return recipies
  }

  public async create ({ auth, request }: HttpContextContract) {
    await auth.authenticate()
    const recipy = new Recipy()
    recipy.name = request.input('name')
    await recipy.save()
    return recipy
  }

  public async show ({ params }: HttpContextContract) {
    const recipy = await Recipy.find(params.id)
    return recipy
  }

  public async update ({ params, request }: HttpContextContract) {
    const recipy = await Recipy.findOrFail(params.id)
    recipy.name = request.input('name')
    await recipy.save()
    return recipy
  }

  public async delete ({ params }: HttpContextContract) {
    const recipy = await Recipy.findOrFail(params.id)
    await recipy.delete()
    return {}
  }
}
