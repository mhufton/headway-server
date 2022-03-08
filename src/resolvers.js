const { appendUnique, generateSlug } = require("./utilities");

const resolvers = {
  Query: {
    async user(root, { id }, { models }) {
      return models.User.findByPk(id);
    },
    async links(root, {}, { models }) {
      return models.Link.findAll({ order: [["createdAt", "DESC"]], limit: 10 });
    },
    // async originalUrl(root, slug, { models }) {
    //   const urlData = models.Link.findOne({ slug })

    //   if (!urlData) {
    //     console.error({ error: 404, message: "url data not found"})
    //   }
    //   return urlData.url
    // }
  },
  Mutation: {
    async createUser(root, { name, email, password }, { models }) {
      return models.User.create({
        name,
        email,
        password,
      });
    },
    async createLink(root, { url, slug }, { models }) {
      const newSlug = slug
        ? await appendUnique(slug, models)
        : await generateSlug(models);

      return models.Link.create({
        url,
        slug: newSlug,
      });
    },
  },
};

module.exports = resolvers;
