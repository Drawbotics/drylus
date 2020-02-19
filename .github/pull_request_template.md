# PR Template

If this PR is **not** for a _major_ version change / does not introduce breaking changes, you can discard this template.
You can remove any unapplicable section if it doesn't apply to your introduced changes.

## Breaking changes 💥
- First change
- Second change
- ...

## Migration guide from [previous version] 📋
### Enums
In this version, all deprecated enums from [previous version] have been removed. The following table shows the equivalent new field for all removed fields:
| Removed        | New   |
| ------------- |----------|
| OldEnum | NewEnum (optional) |

When upgrading to [new version], simply import and use the new enums instead of the old ones (the props of the components is still named the same).
#### Deprecated Enums
The following emums have been deprecated, and will be removed in the next major version.
| Deprecated        | New   |
| ------------- |----------|
| OldEnum | NewEnum (optional) |

### Props
In this version, all deprecated props from [previous version] have been removed. The following table shows the equivalent new field for all removed fields:
| Prop        | Component   | Replacement |
| ------------- |----------| ---- |
| oldProp | Icon | newProp (optional) |

The following props have been deprecated, and will be removed in the next major version.
| Prop        | Component   | Replacement |
| ------------- |----------| ---- |
| oldProp | Icon | newProp (optional) |